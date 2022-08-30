import { freeze } from 'immer'

export interface Intent<T> {
  (caller: string, payload: T): void
}

export interface IntentBody<T = any> {
  caller?: string
  payload: T
  type: string
}

/** Used by createUseCase, avoid creating intents by hand, try to use payload, subscribe and use state or create new use cases instead. */
export function createIntent<T>(
  type: string,
  dispatch: (intent: IntentBody<T>) => void
): (caller: string, payload: T) => void
export function createIntent<T>(
  type: string,
  dispatch: (intent: IntentBody<T>) => void
): Intent<T> {
  return (caller: string, payload: T) => {
    const intent: IntentBody = { type, payload: freeze(payload), caller }
    return dispatch(intent)
  }
}
