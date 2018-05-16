import { map, tap } from 'rxjs/operators'
import { dispatch } from 'services/dispatcher'
import { updateNumbers } from 'state/numbers'
import { createIntent } from 'utils/architecture/createIntent'
import { createUseCase } from 'utils/architecture/createUseCase'
import { createNumbersArrOfLength } from 'utils/createNumbersArrOfLength'

interface DI {
  updateNumbers: typeof updateNumbers
}

const name = 'numbers/setLength'

export const setNumbersLengthIntent = createIntent<number>(name, dispatch)

export const setNumbersLengthUseCase = createUseCase<DI, number>(name,
  (intents, di) =>
    intents
      .pipe(
        map(intent => createNumbersArrOfLength(intent.payload)),
        tap(di.updateNumbers)
      ),
  { hasIntent: true }
)
