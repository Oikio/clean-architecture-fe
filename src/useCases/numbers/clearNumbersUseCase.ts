import { dispatch } from 'dispatcher'
import { tap } from 'rxjs/operators/tap'
import { clearNumbers as clearNumbers } from 'state/numbers'
import { createIntent } from 'utils/architecture/createIntent'
import { createUseCase } from 'utils/architecture/createUseCase'

const CLEAR_NUMBERS = 'CLEAR_NUMBERS'
export const clearNumbersIntent = createIntent(CLEAR_NUMBERS, dispatch)

interface DI {
  clearNumbers: typeof clearNumbers
}

export const clearNumberUseCase = createUseCase<DI>('numbers/clear',
  (intents$, di) =>
    intents$
      .pipe(
        tap(di.clearNumbers),
    ),

  CLEAR_NUMBERS
)
