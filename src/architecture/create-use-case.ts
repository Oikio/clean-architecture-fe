import { identity, Subject } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { createIntent } from './create-intent'
import { dispatch, dispatcher } from './dispatcher'
import { Intent, UseCase, UseCaseCallback } from './types'

interface Options {
  /**
   * If UseCase has intent to trigger it, then intentsStream would be filtered by the name of the UseCase.
   * If intent is truthy, createUseCase function will provide intent in returned object
   */
  intent?: boolean,
}

export const _useCasesStream = new Subject<{ name: string, payload: any }>()

export function createUseCase<SideEffects>(
  name: string,
  useCaseCallback: UseCaseCallback<SideEffects>,
  options?: Options,
): { useCase: UseCase<SideEffects>; intent: () => void }

export function createUseCase<SideEffects, T>(
  name: string,
  useCaseCallback: UseCaseCallback<SideEffects, T>,
  options?: Options,
): { useCase: UseCase<SideEffects, T>; intent: (payload: T) => void }

export function createUseCase<SideEffects, T>(
  name: string,
  useCaseCallback: UseCaseCallback<SideEffects, T>,
  options?: Options,
) {
  const { intent } = options || {};
  const useCaseAndIntent = {
    useCase: (sideEffects: SideEffects) =>
      useCaseCallback(
        dispatcher
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

      intent: intent ? createIntent<T>(name, dispatch) : undefined
  } as { useCase: UseCase<SideEffects, T>; intent: (payload: T) => void }

  return useCaseAndIntent
}
