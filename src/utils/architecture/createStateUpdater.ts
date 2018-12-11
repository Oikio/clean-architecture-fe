import { BehaviorSubject, Subject } from 'rxjs';

interface Arity1Updater<T> { (state: T): T }
interface Arity2Updater<T, U> { (state: T, payload: U): T }

const isArity1 = (fn: Function): fn is Arity1Updater<any> => fn.length === 1
const isArity2 = (fn: Function): fn is Arity2Updater<any, any> => fn.length === 2

// used only for logging
export const _stateUpdatersStream = new Subject<{ name: string, byUseCase: string, payload?: any }>()

export function createStateUpdater<T>(
  name: string,
  fn: (state: T) => T,
  cell: BehaviorSubject<T>
): (byUseCase: string) => void

export function createStateUpdater<T, U>(
  name: string,
  fn: Arity1Updater<T> | Arity2Updater<T, U>,
  cell: BehaviorSubject<T>
): (byUseCase: string, payload: U) => void

export function createStateUpdater<T, U>(
  name: string,
  fn: Arity1Updater<T> | Arity2Updater<T, U>,
  cell: BehaviorSubject<T>
) {
  if (isArity1(fn)) {
    return (byUseCase: string) => {
      if (process.env.NODE_ENV === 'development') _stateUpdatersStream.next({ name, byUseCase })
      cell.next(fn(cell.getValue()))
    }
  }
  if (isArity2(fn)) {
    return (byUseCase: string, payload: U) => {
      if (process.env.NODE_ENV === 'development') _stateUpdatersStream.next({ name, byUseCase, payload })
      cell.next((fn as Arity2Updater<T, U>)(cell.getValue(), payload))
    }
  }
  throw new Error('You must provide stateUpdater function with 1-2 arguments')
}
