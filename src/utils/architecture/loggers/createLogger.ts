import { combineLatest, identity, Observable } from 'rxjs'
import { create } from 'rxjs-spy/spy-factory'
import { first, map, tap, withLatestFrom } from 'rxjs/operators'

/**
 * Redux devtools connector
 */
export const devtools = process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect()
  : { init: () => { }, send: () => { } } // tslint:disable-line

/**
 * By default connects to redux devtools
 * @param stateMap hashmap of observables state, that will be passed to redux devtools or console.log
 * @param dispatcher dispatcher stream
 * @param ops
 */
export const createLogger = <T= { [key: string]: Observable<any> }>(
  stateMap: T,
  dispatcher: Observable<any>,
  ops: { log?: boolean, spy?: boolean } = {}
) => {

  if (ops.spy) {
    setTimeout(() => {
      const spy = create()
    }, 100);
  }

  const stateNames = Object.keys(stateMap)
  const stateObservablesArr: Observable<any>[] = stateNames.map(k => (stateMap as any)[k])

  const state = combineLatest(stateObservablesArr).pipe(
    map(
      stateArr => stateNames
        .map((name, i) => ([name, stateArr[i]]))
        .reduce((prev: { [key: string]: string }, curr) => {
          prev[curr[0]] = curr[1]
          return prev
        }, {})
    )
  )

  state
    .pipe(
      first(),
      tap(devtools.init),
      ops.log
        ? tap(
          currentState => {
            console.group('INIT: ')
            console.log(currentState)
            console.groupEnd()
          }
        )
        : identity
    )
    .subscribe()

  const devtoolsLogger = dispatcher.pipe(
    withLatestFrom(state),
    tap(([intent, currentState]) => devtools.send(intent, currentState)),
    ops.log
      ? tap(
        ([intent, currentState]) => {
          console.group('INTENT: ')
          console.log(intent, currentState)
          console.groupEnd()
        }
      )
      : identity
  ).subscribe()

  return {
    terminate: () => {
      devtoolsLogger.unsubscribe()
    }
  }
}
