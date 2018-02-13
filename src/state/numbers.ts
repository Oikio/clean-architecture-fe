import { BehaviorSubject } from 'rxjs'
import { tag } from 'rxjs-spy/operator/tag'

// We can keep observables for state as subjects even in components, at least for now
const state$ = new BehaviorSubject<number[]>([])
export const numbers$: typeof state$ = tag.call(state$, 'state/numbers')

// The initialization can be in separate file, to prevent side effects during units tests
const _clearNumbers = ($: typeof numbers$) => () => $.next([])
export const clearNumbers = _clearNumbers(numbers$)

const _setNumbersArr = ($: typeof numbers$) => (arr: number[]) => $.next(arr)
export const setNumbers = _setNumbersArr(numbers$)