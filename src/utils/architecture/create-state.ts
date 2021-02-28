import { BehaviorSubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

import { createStateUpdater } from './createStateUpdater'


export const createState = <T>(name: string, startWith: T) => {
  const subject = new BehaviorSubject<T>(startWith)
  const stream = subject.pipe(distinctUntilChanged())
  const update = createStateUpdater<T, T>(`${name}/update`, (state, payload) => payload as T, subject)

  return { subject, stream, update }
}
