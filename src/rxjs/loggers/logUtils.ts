/* eslint-disable no-console */

import { create } from 'rxjs-spy'

/** Tag utility to be used only during development for debugging. Look at it as a better version of tap(console.log) */
export { tag as tagOperator } from 'rxjs-spy/operators'

const spy = create()
spy.log()

/** Useful utility to wrap functions in pipes and compositions, to log arguments and result */
export const wrapLog =
  process.env.NODE_ENV === 'development'
    ? <T>(func: T, label: string = (func as any).name): T =>
        ((...args: any[]) => {
          console.group(`>>> ${(func as any).name} ${label}` || '')
          console.log('Arguments = ', args)
          const result = (func as any)(...args)
          console.log('Result = ', result)
          console.groupEnd()
          return result
        }) as any
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
      <T>(func: T, label?: string) => func
