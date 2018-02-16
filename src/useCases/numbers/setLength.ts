import { dispatch } from 'dispatcher'
import { filter, map, tap } from 'rxjs/operators'
import { updateNumbers } from 'state/numbers'
import { createIntent } from 'utils/architecture/createIntent'
import { createUseCase } from 'utils/architecture/createUseCase'
import { createNumbersArrOfLength } from 'utils/createNumbersArrOfLength'

interface DI {
  updateNumbers: typeof updateNumbers
}

const SET_NUMBERS_LENGTH_INTENT = 'SET_NUMBERS_LENGTH_INTENT'
export const setNumberLengthIntent = createIntent<number>(SET_NUMBERS_LENGTH_INTENT, dispatch)

export const setLengthOfNumberUseCase = createUseCase<DI, number>('numbers/setLength', (intents$, di) =>
  intents$
    .pipe(
      filter(intent => intent.type === SET_NUMBERS_LENGTH_INTENT),
      map(intent => createNumbersArrOfLength(intent.payload)),
      tap(di.updateNumbers)
    )
)
