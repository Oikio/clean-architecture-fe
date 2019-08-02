import { identity, Observable, Subject, Subscription } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { createIntent, Intent } from './createIntent'


interface Ops {
  // If has intent, then intentsStream would be filtered by the name of the useCase,
  // otherwise will dispatch action before each reaction
  // Also in case of intent will provide intent in returned object
  intent?: { dispatch: (intent: Intent<any>) => void }
}

export const _useCasesStream = new Subject<{ name: string, payload?: any }>()

export function createUseCase<SideEffects>(
  name: string,
  useCase: (intentsStream: Observable<Intent<any>>, sideEffects: SideEffects) => Observable<any>,
  ops?: Ops
): { useCase: (intentsStream: Observable<Intent<any>>, sideEffects: SideEffects) => Subscription, intent: () => void }

export function createUseCase<SideEffects, T>(
  name: string,
  useCase: (intentsStream: Observable<Intent<T>>, sideEffects: SideEffects) => Observable<any>,
  ops?: Ops
): {
  useCase: (intentsStream: Observable<Intent<T>>, sideEffects: SideEffects) =>
    Subscription, intent: (payload: T) => void
}

export function createUseCase<SideEffects, T>(
  name: string,
  useCase: (intentsStream: Observable<Intent<T>>, sideEffects: SideEffects) => Observable<any>,
  ops: Ops = {}
) {
  return {
    useCase: (intentsStream: Observable<Intent<T>>, sideEffects: SideEffects) =>
      useCase(
        intentsStream
          .pipe(
            ops.intent
              ? filter((intent: Intent) => intent.type === name)
              : identity,
            process.env.NODE_ENV === 'development'
              ? tap(({ type, payload }) => _useCasesStream.next({ name, payload }))
              : identity
          ),
        sideEffects
      )
        .subscribe(),
    intent: ops.intent ? createIntent<Intent<T>>(name, ops.intent.dispatch) : undefined!
  }
}
