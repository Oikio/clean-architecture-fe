import { createLogger } from 'utils/architecture/createLogger'

const logger = createLogger()

// HMR
if (module.hot) {
  module.hot.dispose(() => {
    logger.teardown()
  })
}
