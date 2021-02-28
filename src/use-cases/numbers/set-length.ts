import { map, tap } from 'rxjs/operators'

import { createUseCase } from '../../architecture'
import { updateNumbers } from '../../state/numbers'


interface SideEffects {
  updateNumbers: typeof updateNumbers
}

type Payload = number

const createNumbersArrOfLength = (n: number) => {
  let i = 0
  const arr = []
  while (i < n) {
    arr.push(i)
    i++
  }
  return arr
}

const name = 'use-case.numbers.set-length'
export const { useCase: setNumbersLengthUseCase, intent: setNumbersLengthIntent } =
  createUseCase<SideEffects, Payload>(name,
    (intents, se) =>
      intents
        .pipe(
          map(intent => createNumbersArrOfLength(intent.payload)),
          tap(payload => se.updateNumbers(name, payload))
        ),
    { intent: true }
  )
