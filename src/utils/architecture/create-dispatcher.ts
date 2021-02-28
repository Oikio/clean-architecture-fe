import { Subject } from 'rxjs';

import { Intent } from './types';

export const createDispatcher = <T = any>() => {
  const dispatcher = new Subject<Intent<T>>()
  const dispatcher$ = dispatcher.asObservable()
  const dispatch = (intent: Intent<T>) => dispatcher.next(intent)
  dispatcher.subscribe()

  return { dispatcher: dispatcher$, dispatch }
}
