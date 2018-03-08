import { dispatch } from 'dispatcher'
import { filter, map, tap } from 'rxjs/operators'
import { updateNumbers } from 'state/numbers'
import { createIntent } from 'utils/architecture/createIntent'
import { createUseCase } from 'utils/architecture/createUseCase'
import { createNumbersArrOfLength } from 'utils/createNumbersArrOfLength'

interface DI {
  updateNumbers: typeof updateNumbers
}

const SET_LENGTH_OF_NUMBERS = 'SET_LENGTH_OF_NUMBERS'
export const setLengthOfNumbersIntent = createIntent<number>(SET_LENGTH_OF_NUMBERS, dispatch)

export const setLengthOfNumberUseCase = createUseCase<DI, number>('numbers/setLength',
  (intents$, di) =>
    intents$
      .pipe(
        map(intent => createNumbersArrOfLength(intent.payload)),
        tap(di.updateNumbers)
      ),

  SET_LENGTH_OF_NUMBERS
)
