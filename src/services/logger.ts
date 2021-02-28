import { dispatcher } from '../dispatcher'
import { name as numbersName, numbers$ } from '../state/numbers'
import { name as evenNumbersName, evenNumbers$ } from '../state/even-numbers'
import { name as numbersWarningName, numbersWarning$ } from '../state/numbers-warning'
import { _stateUpdatersStream } from '../utils/architecture/create-state-updater'
import { _useCasesStream } from '../utils/architecture/create-use-case'
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
