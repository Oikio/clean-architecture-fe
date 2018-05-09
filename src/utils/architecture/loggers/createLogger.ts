import { combineLatest, identity, Observable } from 'rxjs'
import { first, map, tap, withLatestFrom } from 'rxjs/operators'

/**
 * Redux devtools connector
 */
const devtools = process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect()
  : { init: () => { }, send: () => { } } // tslint:disable-line


const logCurrentState = (currentState: any) => {
  console.group('INIT: ')
  console.log(currentState)
  console.groupEnd()
}

/**
 * By default connects to redux devtools
 * @param stateMap hashmap of observables state, that will be passed to redux devtools or console.log
 * @param dispatcher dispatcher stream
 * @param ops
 */
export const createLogger = <T= { [key: string]: Observable<any> }>(
  dispatcher: Observable<any>,
  stateMap: T,
  ops: { log?: boolean } = {}
) => {

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
        ? tap(logCurrentState)
        : identity
    )
    .subscribe()

  const devtoolsLogger = dispatcher
    .pipe(
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
    )
    .subscribe()

  const terminate = () => {
    devtoolsLogger.unsubscribe()
  }

  // HMR
  if (module.hot) {
    module.hot.dispose(() => {
      terminate()
    })
  }

  return {
    terminate
  }
}

