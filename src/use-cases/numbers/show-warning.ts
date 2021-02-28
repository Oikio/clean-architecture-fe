import { tap } from 'rxjs/operators'
import { dispatch } from '../../dispatcher'

import { numbers$ } from '../../state/numbers'
import { updateNumbersWarning } from '../../state/numbers-warning'
import { createUseCase } from '../../utils/architecture/create-use-case'


interface SideEffects {
  numbers$: typeof numbers$
  updateNumbersWarning: typeof updateNumbersWarning
}

const name = 'use-case.numbers.show-warning'
export const { useCase: showNumbersWarningUseCase } = createUseCase<SideEffects>(name,
  (intents, se) =>
    se.numbers$
      .pipe(
        tap(numbers =>
          numbers.length === 0
            ? se.updateNumbersWarning(name, `Please set the array's length, but less than 10.`)
            : numbers.length >= 10
              ? se.updateNumbersWarning(name, `Isn't that too much?`)
              : se.updateNumbersWarning(name, 'Good boy!')
        )
      ),
  dispatch,
)
