import { tap } from 'rxjs/operators'

import { createUseCase } from '../../architecture'
import { clearNumbers } from '../../state/numbers'


interface SideEffects {
  clearNumbers: typeof clearNumbers
}

const name = 'use-case.numbers.clear'
export const { useCase: clearNumbersUseCase, intent: clearNumbersIntent } = createUseCase<SideEffects>(name,
  (intents, se) =>
    intents
      .pipe(
        tap(() => se.clearNumbers(name))
      ),
  { intent: true }
)
