import { Subject } from 'rxjs'
import { tag } from 'rxjs-spy/operator/tag'

import { clear as clearNumbers } from '../../state/numbers'

const useCase$ = new Subject()
const clear$: typeof useCase$ = tag.call(useCase$, 'useCases/numbers/clear')

const _clear = (
  di: {
    clearNumbers: typeof clearNumbers
    clear$: typeof clear$
  }
) => {
  di.clear$
    .do(di.clearNumbers)
    .subscribe()

  return () => di.clear$.next()
}

// The initialization can be in separate file, to prevent side effects during units tests
export const clear = _clear({ clear$, clearNumbers })