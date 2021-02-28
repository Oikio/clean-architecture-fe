import { combineLatest, identity, merge, Observable, zip } from 'rxjs'
import { map, tap, withLatestFrom, skip } from 'rxjs/operators'

import { Intent } from '../types'


/**
 * Redux devtools connector
 */
const devtools = process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect()
  : { init: () => { }, send: () => { } } // tslint:disable-line

/**
 * Logs intents, state and useCases changes.
 * By default connects to redux devtools.
 * @param stateMap observables with state, which will be passed to redux devtools or console.log
 * @param dispatcher dispatcher stream
 * @param ops
 */
export const createLogger = <T = { [key: string]: Observable<any> }>(
  dispatcher: Observable<Intent>,
  stateUpdaters: Observable<{ name: string, byUseCase: string, payload?: any }>,
  useCases: Observable<{ name: string, payload?: any }>,
  stateMap: T & { [key: string]: Observable<any> },
  ops: { log?: boolean } = {}
) => {

  const stateNames = Object.keys(stateMap)
  const stateObservablesArr = stateNames.map(
    name => (
      stateMap[name].pipe(
        map(streamState => ([name, streamState] as [string, any]))
      )
    )
  )

  const lastChangedState = merge(...stateObservablesArr)

  const state = combineLatest(...stateObservablesArr)
    .pipe(
      map(
        stateArr => stateArr.reduce((wholeState, [streamName, streamState]) => {
          wholeState[streamName] = streamState;
          return wholeState;
        }, {} as { [key: string]: any })
      )
    )

  const stateLogger = zip(
    // skipping first values, state is emitted only after every stateObservable has produced first value (combineLatest)
    lastChangedState.pipe(skip(stateObservablesArr.length - 1)),
    state
  )
    .pipe(
      withLatestFrom(stateUpdaters),
      tap(
        ([[[lastChangedStateName], currentState], updater]) => devtools.send(
          {
            type: `[state] ${lastChangedStateName} <- ${updater.name} <- ${updater.byUseCase}`,
            useCaseName: updater.byUseCase,
            updater: updater.name,
            lastChangedState: lastChangedStateName,
            payload: updater.payload
          },
          currentState
        )
      ),
      ops.log
        ? tap(
          ([[[lastChangedStateName], currentState], updater]) => {
            console.group(`[state] ${lastChangedStateName} <- ${updater.name} <- ${updater.byUseCase}`)
            console.log(updater.payload)
            console.log(currentState)
            console.groupEnd()
          }
        )
        : identity

    )
    .subscribe()

  const intentsLogger = dispatcher
    .pipe(
      withLatestFrom(state),
      tap(
        ([intent, currentState]) => devtools.send(
          { ...intent, type: `[intent] ${intent.type}` },
          currentState
        )
      ),
      ops.log
        ? tap(
          ([intent, currentState]) => {
            console.group(`[intent] ${intent.type}`)
            console.log(intent)
            console.log(currentState)
            console.groupEnd()
          }
        )
        : identity
    )
    .subscribe()

  const useCasesLogger = useCases.pipe(
    withLatestFrom(state),
    tap(
      ([{ name, payload }, currentState]) => devtools.send(
        { type: `[useCase] ${name}`, payload },
        currentState
      )
    ),
    ops.log
      ? tap(
        ([{ name, payload }]) => {
          console.group(`[useCase] ${name}`, payload)
          console.groupEnd()
        }
      )
      : identity
  ).subscribe()

  const terminate = () => {
    stateLogger.unsubscribe()
    intentsLogger.unsubscribe()
    useCasesLogger.unsubscribe()
  }

  return {
    terminate
  }
}
