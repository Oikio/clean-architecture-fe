import { numbersStream } from 'state/numbers'
import { numbersWarningStream } from 'state/numbersWarning'
import { createLogger } from 'utils/architecture/loggers/createLogger'

import { dispatcher } from './dispatcher'
import { _stateUpdatersStream } from 'utils/architecture/createStateUpdater';

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger(
    dispatcher,
    _stateUpdatersStream,
    {
      numbers: numbersStream,
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
