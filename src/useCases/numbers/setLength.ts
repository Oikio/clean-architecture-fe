import { setNumbers } from '../../state/numbers'
import { Subject } from 'rxjs';

const setLengthOfNumbers$ = new Subject<number>()

const createArr = (n: number) => {
  let i = 0
  const arr = []
  while (i < n) {
    arr.push(i)
    i++
  }
  return arr
}

const _setLengthOfNumbers = (
  di:
    {
      setLengthOfNumbers$: typeof setLengthOfNumbers$,
      setNumbers: typeof setNumbers
    }
) => {
  di.setLengthOfNumbers$
    .map(createArr)
    .do(di.setNumbers)
    .subscribe()

  return (n: number) => setLengthOfNumbers$.next(n)
}

// The initialization can go to separate file, to prevent side effects during units tests
export const setLengthOfNumbers = _setLengthOfNumbers({ setLengthOfNumbers$, setNumbers })