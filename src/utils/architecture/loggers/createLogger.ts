import { combineLatest, identity, Observable } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'

import { Intent } from '../createIntent'

/**
 * Redux devtools connector
 */
const devtools = process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect()
  : { init: () => { }, send: () => { } } // tslint:disable-line

/**
 * By default connects to redux devtools
 * @param stateMap hashmap of observables state, that will be passed to redux devtools or console.log
 * @param dispatcher dispatcher stream
 * @param ops
 */
export const createLogger = <T = { [key: string]: Observable<any> }>(
  dispatcher: Observable<Intent>,
  stateUpdaters: Observable<{ name: string, intentName: string, payload?: any }>,
  stateMap: T,
  ops: { log?: boolean } = {}
) => {

  const stateNames = Object.keys(stateMap)
  const stateObservablesArr: Observable<any>[] = stateNames.map(k => (stateMap as any)[k])

  const state = combineLatest(stateObservablesArr)
    .pipe(
      map(
        stateArr => stateNames
          .map((name, i) => ([name, stateArr[i]]))
          .reduce((prev: { [key: string]: string }, curr) => {
            prev[curr[0]] = curr[1]
            return prev
          }, {})
      )
    )

  const stateLogger = state
    .pipe(
      withLatestFrom(stateUpdaters),
      tap(([currentState, updater]) => devtools.send(
        {
          type: `[updater] ${updater.name} [byIntent] ${updater.intentName}`,
          payload: updater.payload
        },
        currentState
      )
      ),
      ops.log
        ? tap(
          ([currentState, updater]) => {
            console.group(`[updater] ${updater.name} [byIntent] ${updater.intentName}`)
            console.log(updater.payload)
            console.log(currentState)
            console.groupEnd()
          }
        )
        : identity

    )
    .subscribe()

  // TODO: return if state logger will be inaccurate
  // const stateUpdatersLogger = stateUpdaters.pipe(
  //   withLatestFrom(state),
  //   tap(
  //     ([updater, currentState]) =>
  //       devtools.send(
  //         {
  //           type: `[updater] ${updater.name} [byIntent] ${updater.intentName}`,
  //           payload: updater.payload
  //         },
  //         currentState
  //       )
  //   ),
  //   ops.log
  //     ? tap(
  //       ([updater, currentState]) => {
  //         console.group(`[updater] ${updater.name} [byIntent] ${updater.intentName}`)
  //         console.log(updater)
  //         console.log(currentState)
  //         console.groupEnd()
  //       }
  //     )
  //     : identity
  // )
  //   .subscribe()

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

  const terminate = () => {
    stateLogger.unsubscribe()
    // stateUpdatersLogger.unsubscribe()
    intentsLogger.unsubscribe()
  }

  return {
    terminate
  }
}
