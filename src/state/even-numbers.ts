import { map } from 'rxjs/operators'
import { numbers$, numbers } from '../state/numbers'

const adapter = (arr: typeof numbers) => arr.filter(n => n % 2 === 0)

export type EvenNumbersState = number[]

export const name = 'state.even-numbers'
export const initialState: EvenNumbersState = [];
export const evenNumbers$ = numbers$.pipe(map(adapter))

export const evenNumbers = {
  get eventNumbers() {
    return adapter(numbers)
  }
}.eventNumbers
