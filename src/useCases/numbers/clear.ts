import { dispatch } from 'dispatcher'
import { filter, tap } from 'rxjs/operators'
import { clear as clearNumbers } from 'state/numbers'
import { createIntent } from 'utils/architecture/createIntent'
import { createUseCase } from 'utils/architecture/createUseCase'

const CLEAR_NUMBERS_INTENT = 'CLEAR_NUMBERS_INTENT'
export const clearNumbersIntent = createIntent(CLEAR_NUMBERS_INTENT, dispatch)

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
