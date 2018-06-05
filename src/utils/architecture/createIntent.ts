export interface Intent<T = any> { type: string, payload: T }

export function createIntent(type: string, dispatch: (intent: Intent) => void): () => void
export function createIntent<T>(type: string, dispatch: (intent: Intent<T>) => void): (payload: T) => void
export function createIntent<T>(type: string, dispatch: (intent: Intent<T>) => void) {
  return (payload: T) => dispatch({ type, payload } as Intent)
}
