import { tap } from 'rxjs/operators'
import { dispatch } from 'services/dispatcher'
import { numbersStream } from 'state/numbers'
import { updateNumbersWarning } from 'state/numbersWarning'
import { createIntent } from 'utils/architecture/createIntent'
import { createUseCase } from 'utils/architecture/createUseCase'

const name = 'numbers/showWarning'

const showNumbersWarningIntent = createIntent(name, dispatch)

interface DI {
  numbersStream: typeof numbersStream
  updateNumbersWarning: typeof updateNumbersWarning
}

export const showNumbersWarningUseCase = createUseCase<DI>(name,
  (intents, di) =>
    numbersStream
      .pipe(
        tap(showNumbersWarningIntent),
        tap(numbers =>
          numbers.length === 0
            ? di.updateNumbersWarning(`Please set the array's length, but less than 10.`)
            : numbers.length >= 10
              ? di.updateNumbersWarning(`Isn't that too much?`)
              : di.updateNumbersWarning('Good boy!')
        )
      )
)
