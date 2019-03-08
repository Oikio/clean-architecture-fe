import { map, tap } from 'rxjs/operators'

import { dispatch } from '../../dispatcher'
import { updateNumbers } from '../../state/numbers'
import { createUseCase } from '../../utils/architecture/createUseCase'
import { createNumbersArrOfLength } from '../../utils/createNumbersArrOfLength'


interface DI {
  updateNumbers: typeof updateNumbers
}

type Payload = number

const name = 'numbers/setLength'
export const { useCase: setNumbersLengthUseCase, intent: setNumbersLengthIntent } = createUseCase<DI, Payload>(name,
  (intents, di) =>
    intents
      .pipe(
        map(intent => createNumbersArrOfLength(intent.payload)),
        tap(payload => di.updateNumbers(name, payload))
      ),
  { intent: { dispatch } }
)
