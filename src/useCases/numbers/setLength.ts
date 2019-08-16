import { map, tap } from 'rxjs/operators'

import { dispatch } from '../../dispatcher'
import { updateNumbers } from '../../state/numbers'
import { createUseCase } from '../../utils/architecture/createUseCase'


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

const name = 'numbers/setLength'
export const { useCase: setNumbersLengthUseCase, intent: setNumbersLengthIntent } =
  createUseCase<SideEffects, Payload>(name,
    (intents, se) =>
      intents
        .pipe(
          map(intent => createNumbersArrOfLength(intent.payload)),
          tap(payload => se.updateNumbers(name, payload))
        ),
    { intent: { dispatch } }
  )
