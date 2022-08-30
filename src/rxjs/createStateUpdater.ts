import type { BehaviorSubject } from 'rxjs'
import { Subject } from 'rxjs'

interface Arity1Updater<T> {
  (state: T): T
}
interface Arity2Updater<T, U> {
  (state: T, payload: U): T
}

const isArity0 = (fn: Function): fn is Arity1Updater<any> => fn.length === 0
const isArity1 = (fn: Function): fn is Arity1Updater<any> => fn.length === 1
const isArity2 = (fn: Function): fn is Arity2Updater<any, any> => fn.length === 2

// used only for logging
// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
export const _stateUpdatersStream = new Subject<{
  byUseCase: string
  name: string
  payload?: any
}>()

/** State updaters are bound to the state, create only in case of complex updates which might be reused by several of use cases */
export function createStateUpdater<T>(
  name: string,
  fn: (state: T) => T,
  cell: BehaviorSubject<T>
): (byUseCase: string) => void

export function createStateUpdater<State, Payload>(
  name: string,
  fn: Arity1Updater<State> | Arity2Updater<State, Payload>,
  cell: BehaviorSubject<State>
): (byUseCase: string, payload: Payload) => void

export function createStateUpdater<State, Payload>(
  name: string,
  fn: Arity1Updater<State> | Arity2Updater<State, Payload>,
  cell: BehaviorSubject<State>
) {
  if (isArity1(fn) || isArity0(fn)) {
    return (byUseCase: string) => {
      if (process.env.NODE_ENV === 'development') {
        _stateUpdatersStream.next({ name, byUseCase })
      }
      cell.next(fn(cell.getValue()))
    }
  }
  if (isArity2(fn)) {
    return (byUseCase: string, payload: Payload) => {
      if (process.env.NODE_ENV === 'development') {
        _stateUpdatersStream.next({ name, byUseCase, payload })
      }
      cell.next((fn as Arity2Updater<State, Payload>)(cell.getValue(), payload))
    }
  }
  throw new Error('You must provide stateUpdater function with 1-2 arguments')
}
