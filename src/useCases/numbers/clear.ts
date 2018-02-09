import { clearNumbers } from '../../state/numbers'
import { Subject } from 'rxjs';

const clear$ = new Subject<number>()

const _clear = (
  di:
    {
      clearNumbers: typeof clearNumbers
      clear$: typeof clear$
    }
) => {
  di.clear$
    .do(di.clearNumbers)
    .subscribe()

  return () => clear$.next()
}

// The initialization can go to separate file, to prevent side effects during units tests
export const clear = _clear({ clear$, clearNumbers })