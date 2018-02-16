import { tag } from 'rxjs-spy/operators/tag'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { Intent } from './createIntent'


export function createUseCase
  <DI = {}>(
    name: string,
    useCase: (intents$: Observable<Intent>, di: DI) => Observable<any>
  ): (intents$: Observable<Intent>, di: DI) => Subscription

export function createUseCase
  <DI = {}, T = {}>(
    name: string,
    useCase: (intents$: Observable<Intent<T>>, di: DI) => Observable<any>
  ): (intents$: Observable<Intent>, di?: DI) => Subscription

export function createUseCase
  <DI = {}, T = {}>(
    name: string,
    useCase: (intents$: Observable<Intent>, di: DI) => Observable<any>
  ) {
  return (intents$: Observable<Intent>, di?: DI) =>
    useCase(intents$.pipe(tag(`useCase/${name}`)), di || {} as DI).subscribe()
}
