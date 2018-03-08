import { tag } from 'rxjs-spy/operators/tag'
import { Subject } from 'rxjs/Subject'

import { Intent } from './createIntent'

export const createDispatcher = () => {
  const dispatcher$ = new Subject<Intent>()
  const stream$ = dispatcher$.asObservable()
  const dispatch = (intent: Intent) => dispatcher$.next(intent)
  dispatcher$.pipe(tag(`DISPATCHER`)).subscribe()

  return { dispatcher$: stream$, dispatch }
}
