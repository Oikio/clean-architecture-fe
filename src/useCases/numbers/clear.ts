import { tap } from 'rxjs/operators'

import { dispatch } from '../../dispatcher'
import { clearNumbers } from '../../state/numbers'
import { createUseCase } from '../../utils/architecture/createUseCase'


interface DI {
  clearNumbers: typeof clearNumbers
}

const name = 'numbers/clear'
export const { useCase: clearNumbersUseCase, intent: clearNumbersIntent } = createUseCase<DI>(name,
  (intents, di) =>
    intents
      .pipe(
        tap(() => di.clearNumbers(name))
      ),
  { intent: { dispatch } }
)
