import { evenNumbersStream } from '../state/evenNumbers'
import { numbersStream } from '../state/numbers'
import { numbersWarningStream } from '../state/numbersWarning'
import { _stateUpdatersStream } from '../utils/architecture/createStateUpdater'
import { _useCasesStream } from '../utils/architecture/createUseCase'
import { createLogger } from '../utils/architecture/loggers/createLogger'
import { dispatcher } from './dispatcher'


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
