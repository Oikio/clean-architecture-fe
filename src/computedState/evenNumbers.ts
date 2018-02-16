import { map } from 'rxjs/operators'
import { numbers$ } from 'state/numbers'

export type EvenNumbersState = number[]
export const evenNumbers$ = numbers$
  .pipe(
    map(
      arr => arr.filter(n => n % 2 === 0)
    )
  )
