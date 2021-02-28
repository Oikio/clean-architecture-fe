import { BehaviorSubject, Subject } from 'rxjs'

import { Reducer, StateUpdaterLog } from './types'

export const _stateUpdatersStream = new Subject<StateUpdaterLog>(); // used only for logging

export function createStateUpdater<T>(
  name: string,
  reducer: Reducer<T>,
  subject: BehaviorSubject<T>
): (byUseCase: string) => void

export function createStateUpdater<T, U>(
  name: string,
  reducer: Reducer<T, U>,
  subject: BehaviorSubject<T>
): (byUseCase: string, payload: U) => void

export function createStateUpdater<T, U>(
  name: string,
  reducer: Reducer<T, U>,
  subject: BehaviorSubject<T>
) {
  return (byUseCase: string, payload: U) => {
    process.env.NODE_ENV === 'development' && _stateUpdatersStream.next({ name, byUseCase, payload })

    const currentState = subject.getValue()
    const nextState = reducer(currentState, payload)

    subject.next(nextState)
  };
}
