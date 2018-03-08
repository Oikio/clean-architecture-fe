import { numbers$ } from 'state/numbers'
import { createStateLogger } from 'utils/architecture/loggers/createStateLogger'
import { createStreamsSpy } from 'utils/architecture/loggers/createStreamsSpy'

if (process.env.NODE_ENV === 'development') {
  const logger = createStateLogger({
    numbers$
  })

  const spy = createStreamsSpy()

  // HMR
  if (module.hot) {
    module.hot.dispose(() => {
      logger.unsubscribe()
      spy.teardown()
    })
  }
}
