import { BehaviorSubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

import { createStateUpdater } from './create-state-updater'


export const createState = <T>(name: string, startWith: T) => {
  const subject = new BehaviorSubject<T>(startWith)
  const stream = subject.pipe(distinctUntilChanged())
  const update = createStateUpdater<T, T>(`${name}.updater`, (state, payload) => payload as T, subject)

  return {
    get cell() {
      return subject.getValue()
    },
    subject,
    stream,
    update,
  }
}
