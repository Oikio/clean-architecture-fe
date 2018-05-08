import { map } from 'rxjs/operators'
import { numbersStream } from 'state/numbers'

export type EvenNumbersState = number[]
export const evenNumbersStream = numbersStream
  .pipe(
    map(arr => arr.filter(n => n % 2 === 0))
  )
