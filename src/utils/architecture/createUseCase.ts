import { identity, Observable, Subject, Subscription } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { createIntent, Intent } from './createIntent'


interface Ops {
  /**
   * If UseCase has intent to trigger it, then intentsStream would be filtered by the name of the UseCase.
   * Intent needs dispatch method form dispatcher to be passed in configuration.
   * If intent is truthy, createUseCase function will provide intent in returned object
   */
  intent?: { dispatch: (intent: Intent<any>) => void }
}

type UseCaseCallback<SideEffects, IntentType = any> = {
  (intentsStream: Observable<Intent<IntentType>>, sideEffects: SideEffects): Observable<any>
}

type UseCase<SideEffects, IntentType = any> = {
  (intentsStream: Observable<Intent<IntentType>>, sideEffects: SideEffects): Subscription
}

export const _useCasesStream = new Subject<{ name: string, payload?: any }>()

export function createUseCase<SideEffects>(
  name: string,
  useCase: UseCaseCallback<SideEffects>,
  ops?: Ops
): { useCase: UseCase<SideEffects>, intent: () => void }

export function createUseCase<SideEffects, T>(
  name: string,
  useCase: UseCaseCallback<SideEffects, T>,
  ops?: Ops
): {
  useCase: UseCase<SideEffects, T>, intent: (payload: T) => void
}

export function createUseCase<SideEffects, T>(
  name: string,
  useCase: UseCaseCallback<SideEffects, T>,
  ops: Ops = {}
): {
  useCase: UseCase<SideEffects, T>, intent: (payload: T) => void
} {
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
    intent: ops.intent ? createIntent<T>(name, ops.intent.dispatch) : undefined!
  }
}
