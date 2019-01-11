import { BehaviorSubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

import { createStateUpdater } from './createStateUpdater'


export const createState = <T>(name: string, startWith: T) => {
  const cell = new BehaviorSubject<T>(startWith)
  const stream = cell
    .pipe(
      distinctUntilChanged()
    )

  const update = createStateUpdater<T, T>(`${name}/update`, (state, payload) => payload, cell)
  return { cell, stream, update }
}
