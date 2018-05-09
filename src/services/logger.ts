import { numbersStream } from 'state/numbers'
import { createLogger } from 'utils/architecture/loggers/createLogger'

import { dispatcher } from './dispatcher'

createLogger(
  dispatcher,
  {
    numbers: numbersStream
  }
)
