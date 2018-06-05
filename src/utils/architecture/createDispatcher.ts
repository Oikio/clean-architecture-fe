import { Subject } from 'rxjs'

import { Intent } from './createIntent'

export const createDispatcher = <T = any>() => {
  const dispatcher = new Subject<Intent<T>>()
  const stream = dispatcher.asObservable()
  const dispatch = (intent: Intent<T>) => dispatcher.next(intent)
  dispatcher.subscribe()

  return { dispatcher: stream, dispatch }
}
