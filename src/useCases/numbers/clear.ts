import { clearNumbers } from '../../state/numbers'
import { Subject } from 'rxjs';

const clear$ = new Subject<number>()

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