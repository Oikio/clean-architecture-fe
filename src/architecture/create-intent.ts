import { Intent } from './types'

export function createIntent<T = any>(type: string, dispatch: (intent: Intent<T>) => void) {
  return (payload: T) => dispatch({ type, payload })
}
