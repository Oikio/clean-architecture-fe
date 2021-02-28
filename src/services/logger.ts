import { _stateUpdatersStream, _useCasesStream } from '../architecture'
import { dispatcher } from '../architecture/dispatcher'
import { name as numbersName, numbers$ } from '../state/numbers'
import { name as evenNumbersName, evenNumbers$ } from '../state/even-numbers'
import { name as numbersWarningName, numbersWarning$ } from '../state/numbers-warning'
import { createLogger } from '../utils/loggers/create-logger'


if (process.env.NODE_ENV === 'development') {
  const logger = createLogger(
    dispatcher,
    _stateUpdatersStream,
    _useCasesStream,
    {
      [numbersName]: numbers$,
      [evenNumbersName]: evenNumbers$,
      [numbersWarningName]: numbersWarning$
    },
    {
      log: true
    },
  )

  // HMR
  if (module.hot) {
    module.hot.dispose(() => {
      logger.terminate()
    })
  }
}
