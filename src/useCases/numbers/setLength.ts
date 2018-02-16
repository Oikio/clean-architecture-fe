import { Subject } from 'rxjs'
import { tag } from 'rxjs-spy/operator/tag'

import { updateNumbers } from 'state/numbers'
import { createNumbersArrOfLength } from 'utils/createNumbersArrOfLength'
import { createUseCase } from 'utils/architecture/createUseCase';
import { map, tap, filter } from 'rxjs/operators'
import { SET_NUMBERS_LENGTH_INTENT } from 'intents/numbers';

interface DI {
  updateNumbers: typeof updateNumbers
}

export const setLengthOfNumberUseCase = createUseCase<DI, number>('numbers/setLength', (intents$, di) =>
  intents$
    .pipe(
      filter(intent => intent.name === SET_NUMBERS_LENGTH_INTENT),
      map(intent => createNumbersArrOfLength(intent.payload)),
      tap(di.updateNumbers)
    )
)