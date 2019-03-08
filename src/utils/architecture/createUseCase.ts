import { identity, Observable, Subject, Subscription } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { createIntent, Intent } from './createIntent'


interface Ops {
  // If has intent, then intents would be filtered by the name of the useCase,
  // otherwise will dispatch action before each reaction
  // Also in case of intent will provide intent in returned object
  intent?: { dispatch: (intent: Intent<any>) => void }
}

export const _useCasesStream = new Subject<{ name: string, payload?: any }>()

export function createUseCase<DI>(
  name: string,
  useCase: (intents: Observable<Intent<any>>, di: DI) => Observable<any>,
  ops?: Ops
): { useCase: (intents: Observable<Intent<any>>, di: DI) => Subscription, intent: () => void }

export function createUseCase<DI, T>(
  name: string,
  useCase: (intents: Observable<Intent<T>>, di: DI) => Observable<any>,
  ops?: Ops
): { useCase: (intents: Observable<Intent<T>>, di: DI) => Subscription, intent: (payload: T) => void }

export function createUseCase<DI, T>(
  name: string,
  useCase: (intents: Observable<Intent<T>>, di: DI) => Observable<any>,
  ops: Ops = {}
) {
  return {
    useCase: (intents: Observable<Intent<T>>, di: DI) =>
      useCase(
        intents
          .pipe(
            ops.intent
              ? filter((intent: Intent) => intent.type === name)
              : identity,
            process.env.NODE_ENV === 'development'
              ? tap(({ type, payload }) => _useCasesStream.next({ name, payload }))
              : identity
          ),
        di
      )
        .subscribe(),
    intent: ops.intent ? createIntent<Intent<T>>(name, ops.intent.dispatch) : undefined!
  }
}
