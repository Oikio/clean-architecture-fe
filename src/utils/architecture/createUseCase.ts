import { identity, Observable, Subject } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { Intent } from './createIntent'


interface Ops {
  // If has intent, then intents would be filtered by the name of useCase,
  // otherwise will dispatch action before each reaction
  hasIntent?: boolean
}

export const _useCasesStream = new Subject<{ name: string, payload?: any }>()

export const createUseCase =
  <DI, T = any>(
    name: string,
    useCase: (intents: Observable<Intent<T>>, di: DI) => Observable<any>,
    ops: Ops = { hasIntent: false }
  ) => {
    return (intents: Observable<Intent<T>>, di: DI) => {
      return useCase(
        intents
          .pipe(
            ops.hasIntent
              ? filter((intent: Intent) => intent.type === name)
              : identity,
            process.env.NODE_ENV === 'development'
              ? tap(({ type, payload }) => _useCasesStream.next({ name, payload }))
              : identity
          ),
        di
      )
        .subscribe()
    }
  }
