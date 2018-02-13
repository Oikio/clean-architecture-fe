import { BehaviorSubject } from 'rxjs'
import { tag } from 'rxjs-spy/operator/tag'

// We can keep observables for state as subjects even in components, at least for now
export const numbers$ = tag.call(new BehaviorSubject<number[]>([]), 'state/numbers')

// The initialization can be in separate file, to prevent side effects during units tests
const _clearNumbers = ($: typeof numbers$) => () => $.next([])
export const clearNumbers = _clearNumbers(numbers$)

const _setNumbersArr = ($: typeof numbers$) => (arr: number[]) => $.next(arr)
export const setNumbers = _setNumbersArr(numbers$)