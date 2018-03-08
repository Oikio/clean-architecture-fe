import { Observable } from 'rxjs/Observable'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { tap } from 'rxjs/operators/tap'

export const createStateLogger = <T= { [key: string]: Observable<any> }>(stateMap: T) => {
  const stateNames = Object.keys(stateMap)
  const stateObservables: Observable<any>[] = stateNames.map(k => (stateMap as any)[k])
  return combineLatest(stateObservables)
    .pipe(
      tap(
        state => {
          console.group('STATE: ')
          console.log(stateNames
            .map((name, i) => ([name, state[i]]))
            .reduce((prev: any, curr) => {
              prev[curr[0]] = curr[1]
              return prev
            }, {})
          )
          console.groupEnd()
        }
      )
    )
    .subscribe()
}
