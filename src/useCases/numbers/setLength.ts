import { map, tap } from 'rxjs/operators'

import { dispatch } from '../../services/dispatcher'
import { updateNumbers } from '../../state/numbers'
import { createIntent } from '../../utils/architecture/createIntent'
import { createUseCase } from '../../utils/architecture/createUseCase'
import { createNumbersArrOfLength } from '../../utils/createNumbersArrOfLength'


interface DI {
  updateNumbers: typeof updateNumbers
}

const name = 'numbers/setLength'

type Payload = number
export const setNumbersLengthIntent = createIntent<Payload>(name, dispatch)

export const setNumbersLengthUseCase = createUseCase<DI, Payload>(name,
  (intents, di) =>
    intents
      .pipe(
        map(intent => createNumbersArrOfLength(intent.payload)),
        tap(payload => di.updateNumbers(name, payload))
      ),
  { hasIntent: true }
)
