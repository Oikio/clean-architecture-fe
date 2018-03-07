import { create, defaultLogger } from 'rxjs-spy'
import { Observable } from 'rxjs/Observable'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { tap } from 'rxjs/operators/tap'

export const log = process.env.NODE_ENV === 'development'
  ? (...args: any[]) => console.log(...args)
  : (...args: any[]) => { } // tslint:disable-line  

// TODO: add overload with function?
export const wrapLog = process.env.NODE_ENV === 'development'
  ? <T>(label: string, func: T): T =>
    ((...args: any[]) => {
      console.group(label)
      console.log('Arguments = ', ...args)
      const result = (func as any)(...args)
      console.log('Result = ', result)
      console.groupEnd()
      return result
    }) as any
  : <T>(label: string, func: T) => func

export const createLogger = <T= { [key: string]: Observable<any> }>(stateMap?: T) => {
  if (stateMap) {
    const stateNames = Object.keys(stateMap)
    const stateObservables: Observable<any>[] = stateNames.map(k => (stateMap as any)[k])
    combineLatest(stateObservables)
      .pipe(
        tap(
          state => {
            console.group('STATE: ')
            console.log(stateNames.map(name => ({ [name]: state })))
            console.groupEnd()
          }
        )
      )
      .subscribe()
  }

  const spy = create()
  spy.log({
    log: (message: string, ...args: any[]) => {
      if (/notification = next/.test(message)) {
        const tag = message.match(/Tag = (\w*\/?\w*)/)
        console.group((tag && `STREAM: ${tag[1]} updated with:`) || ('COULD NOT FIND TAG FROM: ' + message))
        console.log(...args)
        console.groupEnd()
      }
    }
  })

  return {
    spy
  }
}
