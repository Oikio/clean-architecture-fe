import { Subject } from 'rxjs'

import { Intent } from './createIntent'
export const createDispatcher = () => {
  const dispatcher = new Subject<Intent>()
  const stream = dispatcher.asObservable()
  const dispatch = (intent: Intent) => dispatcher.next(intent)
  dispatcher.pipe(
  ).subscribe()

  return { dispatcher: stream, dispatch }
}
