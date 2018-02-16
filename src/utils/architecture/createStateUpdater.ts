import { BehaviorSubject } from 'rxjs/BehaviorSubject'

interface Arity1Updater<T> { (state: T): T }
interface Arity2Updater<T, U> { (state: T, payload: U): T }

const isArity1 = (fn: Function): fn is Arity1Updater<any> => fn.length == 1
const isArity2 = (fn: Function): fn is Arity2Updater<any, any> => fn.length == 2

export function createStateUpdater<T>(fn: (state: T) => T, state$: BehaviorSubject<T>): () => void
export function createStateUpdater<T, U>(fn: Arity1Updater<T> | Arity2Updater<T, U>, state$: BehaviorSubject<T>): (payload: U) => void
export function createStateUpdater<T, U>(fn: Arity1Updater<T> | Arity2Updater<T, U>, state$: BehaviorSubject<T>) {
  if (isArity1(fn)) return () => state$.next(fn(state$.getValue()))
  // TODO: fix bug with "fn as Arity2Updater<T, U>", can't find roo cause
  if (isArity2(fn)) return (payload: any) => state$.next((fn as Arity2Updater<T, U>)(state$.getValue(), payload))
  throw new Error('You must provide stateUpdater function with 1-2 arguments')
}