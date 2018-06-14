import { tap } from 'rxjs/operators'
import { dispatch } from 'services/dispatcher'
import { clearNumbers as clearNumbers } from 'state/numbers'
import { createIntent } from 'utils/architecture/createIntent'
import { createUseCase } from 'utils/architecture/createUseCase'

const name = 'numbers/clear'

export const clearNumbersIntent = createIntent(name, dispatch)

interface DI {
  clearNumbers: typeof clearNumbers
}

export const clearNumbersUseCase = createUseCase<DI>(name,
  (intents, di) =>
    intents
      .pipe(
        tap(() => di.clearNumbers(name))
      ),
  { hasIntent: true }
)
