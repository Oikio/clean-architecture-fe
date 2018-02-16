import { Subject } from 'rxjs'
import { tag } from 'rxjs-spy/operator/tag'

import { updateNumbers } from '../../state/numbers'
import { createNumbersArrOfLength } from '../../utils/createNumbersArrOfLength'

// Create useCase stream
const useCase$ = new Subject<number>()
const setLengthOfNumbers$ = tag.call(useCase$, 'useCases/numbers/setLength')

// Write business logic and specify DI
const _setLengthOfNumbers = (
  di: {
    setLengthOfNumbers$: typeof setLengthOfNumbers$,
    updateNumbers: typeof updateNumbers
  }
) => {
  di.setLengthOfNumbers$
    .map(createNumbersArrOfLength)
    .do(di.updateNumbers)
    .subscribe()

  return (n: number) => di.setLengthOfNumbers$.next(n)
}

// Initialize
// The initialization can be in separate file, to prevent side effects during units tests
export const setLengthOfNumbers = _setLengthOfNumbers({ setLengthOfNumbers$, updateNumbers })