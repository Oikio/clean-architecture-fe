import { dispatcher } from '../dispatcher'
import { evenNumbersStream } from '../state/even-numbers'
import { numbersStream } from '../state/numbers'
import { numbersWarningStream } from '../state/numbers-warning'
import { _stateUpdatersStream } from '../utils/architecture/create-state-updater'
import { _useCasesStream } from '../utils/architecture/create-use-case'
import { createLogger } from '../utils/loggers/create-logger'


if (process.env.NODE_ENV === 'development') {
  const logger = createLogger(
    dispatcher,
    _stateUpdatersStream,
    _useCasesStream,
    {
      numbers: numbersStream,
      evenNumbers: evenNumbersStream,
      numbersWarning: numbersWarningStream
    }
  )

  // HMR
  if (module.hot) {
    module.hot.dispose(() => {
      logger.terminate()
    })
  }
}
