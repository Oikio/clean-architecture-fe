import { numbersStream } from 'state/numbers'
import { createLogger } from 'utils/architecture/loggers/createLogger'

import { dispatcher } from './dispatcher'

const logger = createLogger(
  {
    numbers: numbersStream
  },
  dispatcher,
  {
    log: true,
    spy: true
  }
)
// HMR
if (module.hot) {
  module.hot.dispose(() => {
    logger.terminate()
  })
}
