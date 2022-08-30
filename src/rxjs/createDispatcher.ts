import { Observable, Subject } from 'rxjs'
import type { IntentBody } from './createIntent'

interface DispatcherForUseCases {
  dispatcher: Observable<IntentBody<any>>
  dispatch(intent: IntentBody<any>): void
}

let internalDefaultDispatcher: DispatcherForUseCases
export const _defaultDispatcher: () => DispatcherForUseCases = () => internalDefaultDispatcher

/** Main event bus for all business logic in usecases, to which they are subscribed */
export const createDispatcher = <T = any>() => {
  const dispatcher = new Subject<IntentBody<T>>()
  const stream = dispatcher.asObservable()
  const dispatch = (intent: IntentBody<T>) => dispatcher.next(intent)
  dispatcher.subscribe()

  if (!_defaultDispatcher) {
    internalDefaultDispatcher = {
      dispatcher: stream,
      dispatch
    }
  }

  return { dispatcher: stream, dispatch, unsubscribe: () => dispatcher.unsubscribe() }
}
