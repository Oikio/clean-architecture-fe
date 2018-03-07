import { numbers$ } from 'state/numbers'
import { createLogger } from 'utils/architecture/createLogger'

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    numbers: numbers$
  })

  // HMR
  if (module.hot) {
    module.hot.accept(() => {
      logger.spy.teardown()
    })
  }
}
