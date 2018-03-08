import { tag } from 'rxjs-spy/operators/tag'
import { Observable } from 'rxjs/Observable'
import { filter } from 'rxjs/operators/filter'
import { Subscription } from 'rxjs/Subscription'

import { Intent } from './createIntent'


export function createUseCase
  <DI>(
    name: string,
    useCase: (intents$: Observable<Intent>, di: DI) => Observable<any>,
    intentType: string
  ): (intents$: Observable<Intent>, di: DI) => Subscription

export function createUseCase
  <DI, T = any>(
    name: string,
    useCase: (intents$: Observable<Intent<T>>, di: DI) => Observable<any>,
    intentType?: string
  ): (intents$: Observable<Intent>, di: DI) => Subscription

export function createUseCase
  <DI, T = any>(
    name: string,
    useCase: (intents$: Observable<Intent<T>>, di: DI) => Observable<any>,
    intentType?: string
  ) {
  return (intents$: Observable<Intent>, di: DI) => {
    intents$.pipe(filter((intent: Intent) => intent.type === intentType), tag(`useCases/${name}`)).subscribe()
    return intentType
      ? useCase(
        intents$.pipe(filter((intent: Intent) => intent.type === intentType)), di || {}
      ).subscribe()
      : useCase(intents$, di || {}).subscribe()
  }
}
