import { identity, Observable } from 'rxjs'
import { filter } from 'rxjs/operators'

import { Intent } from './createIntent'

interface Ops {
  // If has intent, then intents would be filtered by the name of useCase,
  // otherwise will dispatch action before each reaction
  hasIntent?: boolean
}

export function createUseCase
  <DI, T = any>(
    name: string,
    useCase: (intents: Observable<Intent<T>>, di: DI) => Observable<any>,
    ops: Ops = { hasIntent: false }
  ) {
  return (intents: Observable<Intent<T>>, di: DI) => {
    return useCase(
      intents
        .pipe(
          ops.hasIntent ? filter((intent: Intent) => intent.type === name) : identity
        ),
      di || {}
    )
      .subscribe()
  }
}
