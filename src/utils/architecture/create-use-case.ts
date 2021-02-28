import { identity, Observable, Subject } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { createIntent } from './createIntent'
import { Intent, UseCase, UseCaseCallback } from './types'

interface Options {
  /**
   * If UseCase has intent to trigger it, then intentsStream would be filtered by the name of the UseCase.
   * Intent needs dispatch method form dispatcher to be passed in configuration.
   * If intent is truthy, createUseCase function will provide intent in returned object
   */
  intent?: { dispatch: (intent: Intent<any>) => void }
}

export const _useCasesStream = new Subject<{ name: string, payload: any }>()

export function createUseCase<SideEffects>(
  name: string,
  useCase: UseCaseCallback<SideEffects>,
  options?: Options
): { useCase: UseCase<SideEffects>; intent: () => void }

export function createUseCase<SideEffects, T>(
  name: string,
  useCase: UseCaseCallback<SideEffects, T>,
  options?: Options
): { useCase: UseCase<SideEffects, T>; intent: (payload: T) => void }

export function createUseCase<SideEffects, T>(
  name: string,
  useCase: UseCaseCallback<SideEffects, T>,
  options?: Options
) {
  const { intent } = options || {};
  const useCaseAndIntent = {
    useCase: (intentsStream: Observable<Intent<T>>, sideEffects: SideEffects) =>
      useCase(
        intentsStream
          .pipe(
            intent
              ? filter((intent: Intent) => intent.type === name)
              : identity,
            process.env.NODE_ENV === 'development'
              ? tap(({ type, payload }) => _useCasesStream.next({ name, payload }))
              : identity
          ),
        sideEffects
      )
        .subscribe(),

      intent: intent ? createIntent<T>(name, intent.dispatch) : undefined!
  } as { useCase: UseCase<SideEffects, T>; intent: (payload: T) => void }

  return useCaseAndIntent
}
