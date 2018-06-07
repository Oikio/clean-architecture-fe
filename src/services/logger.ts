import { numbersStream } from 'state/numbers'
import { numbersWarningStream } from 'state/numbersWarning'
import { createLogger } from 'utils/architecture/loggers/createLogger'

import { dispatcher } from './dispatcher'

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger(
    dispatcher,
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
