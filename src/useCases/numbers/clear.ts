import { dispatch } from 'dispatcher'
import { filter, tap } from 'rxjs/operators'
import { clearNumbers as clearNumbers } from 'state/numbers'
import { createIntent } from 'utils/architecture/createIntent'
import { createUseCase } from 'utils/architecture/createUseCase'

const CLEAR_NUMBERS = 'CLEAR_NUMBERS'
export const clearNumbersIntent = createIntent(CLEAR_NUMBERS, dispatch)

interface DI {
  clearNumbers: typeof clearNumbers
}

export const clearNumberUseCase = createUseCase<DI>('numbers/clear', (intents$, di) =>
  intents$
    .pipe(
      filter(intent => intent.type === CLEAR_NUMBERS),
      tap(di.clearNumbers)
    )
)
