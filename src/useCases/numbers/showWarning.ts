import { tap } from 'rxjs/operators'

import { numbersStream } from '../../state/numbers'
import { updateNumbersWarning } from '../../state/numbersWarning'
import { createUseCase } from '../../utils/architecture/createUseCase'


interface SideEffects {
  numbersStream: typeof numbersStream
  updateNumbersWarning: typeof updateNumbersWarning
}

const name = 'numbers/showWarning'
export const { useCase: showNumbersWarningUseCase } = createUseCase<SideEffects>(name,
  (intents, se) =>
    numbersStream
      .pipe(
        tap(numbers =>
          numbers.length === 0
            ? se.updateNumbersWarning(name, `Please set the array's length, but less than 10.`)
            : numbers.length >= 10
              ? se.updateNumbersWarning(name, `Isn't that too much?`)
              : se.updateNumbersWarning(name, 'Good boy!')
        )
      )
)
