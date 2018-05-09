import { BehaviorSubject } from 'rxjs'
import { share } from 'rxjs/operators'

import { createStateUpdater } from './createStateUpdater'


export const createState = <T>(name: string, startWith: T) => {
  const cell = new BehaviorSubject<T>(startWith)
  const stream = cell.asObservable()
  cell.pipe(
    share(),
  ).subscribe()
  // TODO: find out why type it's not inherited from fn signature if it's even possible
  const update = createStateUpdater<T, T>((state, payload) => payload, cell)
  return { cell, stream, update }
}
