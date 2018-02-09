import { BehaviorSubject } from "rxjs";

// We can keep observables for state as subjects even in components, at least for now
export const numbers$ = new BehaviorSubject<number[]>([])

const _clearNumbers = ($: typeof numbers$) => () => $.next([])
// The initialization can go to separate file, to prevent side effects during units tests
export const clearNumbers = _clearNumbers(numbers$)

const _setNumbersArr = ($: typeof numbers$) => (arr: number[]) => $.next(arr)
export const setNumbers = _setNumbersArr(numbers$)
