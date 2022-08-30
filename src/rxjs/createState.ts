/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { freeze } from 'immer'
import type { Observable } from 'rxjs'
import { BehaviorSubject } from 'rxjs'
import { createStateUpdater } from './createStateUpdater'

/** Stream of all initialized states as Record<string, Observable<any>> */
export const _stateMapStream: BehaviorSubject<Record<string, Observable<any>>> =
  new BehaviorSubject({})

/** State is a cell with default state updaters to witch any part of app can subscribe */
export const createState = <T>(name: string, initialState: T) => {
  const cell = new BehaviorSubject<T>(freeze(initialState))
  const stream = cell.asObservable()

  if (process.env.NODE_ENV !== 'test' && name in _stateMapStream.getValue()) {
    throw new Error(`State name clash: ${name}, provide unique names for states`)
  }

  _stateMapStream.next({
    ..._stateMapStream.getValue(),
    [name]: stream
  })

  const set = createStateUpdater<T, T>(`${name}/set`, (state, payload) => freeze(payload), cell)
  const reset = createStateUpdater<T>(`${name}/reset`, () => freeze(initialState), cell)

  return { cell, stream, set, reset }
}
