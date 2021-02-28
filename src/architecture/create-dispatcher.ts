import { Subject } from 'rxjs';

import { Intent } from './types';

export const createDispatcher = <T = any>() => {
  const dispatcherSubject = new Subject<Intent<T>>()
  const dispatcher = dispatcherSubject.asObservable()
  const dispatch = (intent: Intent<T>) => dispatcherSubject.next(intent)
  dispatcherSubject.subscribe()

  return { dispatcher, dispatch }
}
