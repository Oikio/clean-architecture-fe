/* eslint-disable no-underscore-dangle */
import type { Observable } from 'rxjs'
import { combineLatest, from } from 'rxjs'

import { map, mapTo, mergeAll, switchMap, take, tap, withLatestFrom } from 'rxjs/operators'
import type { IntentBody } from '../createIntent'
import { _stateMapStream } from '../createState'
import { _stateUpdatersStream } from '../createStateUpdater'

/**
 * Redux devtools connector
 */
const devtools =
  process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({ trace: true, traceLimit: 50 })
    : { init: () => {}, send: () => {} }

/**
 * Logs intents, state and useCases changes to redux devtools or 3rd party via callback.\
 * @param dispatcher - from createDispatcher()
 * @param cb -  callback to log intent and state changes to 3rd party service
 * @returns An object with a terminate function.
 */
export const createLogger = (dispatcher: Observable<IntentBody>, cb?: (type: string) => void) => {
  const emittedStateNames: Set<string> = new Set()

  const state = _stateMapStream.pipe(
    switchMap((stateMapObj) => {
      const names = Object.keys(stateMapObj)

      return combineLatest(names.map((name) => stateMapObj[name])).pipe(
        map((states) =>
          states.reduce<Record<string, any>>((acc, curr, i) => {
            acc[names[i]] = curr
            return acc
          }, {})
        )
      )
    })
  )

  const lastChangedStateName = _stateMapStream.pipe(
    switchMap((stateMapObj) => {
      const names = Object.keys(stateMapObj)
      return from(names.map((name) => stateMapObj[name].pipe(mapTo(name)))).pipe(mergeAll())
    })
  )

  // log initial state
  state
    .pipe(
      take(1),
      tap((currentState) => {
        const type = '[s] INITIAL'
        devtools.send({ type }, currentState)
        Object.keys(currentState).forEach((name) => emittedStateNames.add(name))

        cb?.(type)
      })
    )
    .subscribe()

  const intentsLogger = dispatcher
    .pipe(
      withLatestFrom(state),
      tap(([intent, currentState]) => {
        const type = `[i] (${intent.type.split('/').reverse().join('/')}) [by] (${intent.caller
          ?.split('/')
          .reverse()
          .join('/')})`

        devtools.send(
          {
            ...intent,
            type
          },
          currentState
        )

        cb?.(type)
      })
    )
    .subscribe()

  const stateLogger = state
    .pipe(
      withLatestFrom(_stateUpdatersStream, lastChangedStateName),
      tap(([currentState, updater, changedStateName]) => {
        const isFirstEmission = !emittedStateNames.has(changedStateName)
        if (isFirstEmission) emittedStateNames.add(changedStateName)

        const type = `[s] (${changedStateName.split('/').reverse().join('/')}) [by] (${
          isFirstEmission ? 'INITIAL' : updater.byUseCase.split('/').reverse().join('/')
        })`

        devtools.send(
          {
            lastChangedState: changedStateName,
            payload: updater.payload,
            type,
            updater: updater.name,
            useCaseName: updater.byUseCase
          },
          currentState
        )

        cb?.(type)
      })
    )
    .subscribe()

  return {
    terminate: () => {
      stateLogger.unsubscribe()
      intentsLogger.unsubscribe()
    }
  }
}
