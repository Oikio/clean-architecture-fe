import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, distinct } from 'rxjs/operators'
import { createStateUpdater } from './createStateUpdater'

export const createState = <T>(name: string, startWith: T) => {
  const cell = new BehaviorSubject<T>(startWith)
  const stream = cell
    .pipe(
      distinctUntilChanged()
    )

  const update = createStateUpdater<T, T>((state, payload) => payload, cell)
  return { cell, stream, update }
}
