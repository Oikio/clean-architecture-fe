import { CLEAR_NUMBERS_INTENT } from 'intents/numbers'
import { filter, tap } from 'rxjs/operators'
import { clear as clearNumbers } from 'state/numbers'
import { createUseCase } from 'utils/architecture/createUseCase'


interface DI {
  clearNumbers: typeof clearNumbers
}

export const clearNumberUseCase = createUseCase<DI>('numbers/clear', (intents$, di) =>
  intents$
    .pipe(
      filter(intent => intent.name === CLEAR_NUMBERS_INTENT),
      tap(di.clearNumbers)
    )
)