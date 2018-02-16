import { Observable } from 'rxjs/Observable'

export interface Intent<T = any> { name: string, payload: T }

export function createIntent
  (name: string, dispatch: (intent: Intent) => void): () => void
export function createIntent
  <T>(name: string, dispatch: (intent: Intent<T>) => void): (payload: T) => void
export function createIntent
  <T>(name: string, dispatch: (intent: Intent<T>) => void) {
  return (payload: T) => dispatch({ name, payload } as Intent)
}