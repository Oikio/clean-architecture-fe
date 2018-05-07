import { map } from 'rxjs/operators'
import { numbersStream } from 'state/numbers'

export type EvenNumbersState = number[]
export const EvenNumbersStream = numbersStream
  .pipe(
    map(arr => arr.filter(n => n % 2 === 0))
  )
