import { useEffect, useState, useSyncExternalStore } from 'react'
import type { Observable } from 'rxjs'
import { BehaviorSubject } from 'rxjs'

/** Prefer useCell when possible. Bind component to Observable, first render is always undefined due to asynchronous nature of observables.  */
export function useStream<T>(observable: Observable<T>): T | undefined
export function useStream<T>(observable: Observable<T>, defaultState: T): T

export function useStream<T>(observable: Observable<T>, defaultState?: T) {
  const [subject] = useState(new BehaviorSubject<T | undefined>(defaultState))

  useEffect(() => {
    const subscription = observable.subscribe((v) => subject.next(v))
    return () => subscription.unsubscribe()
  }, [observable])

  return useSyncExternalStore(
    (cb) => {
      const subscription = subject.subscribe(cb)

      return () => subscription.unsubscribe()
    },
    () => subject.getValue()
  )
}
