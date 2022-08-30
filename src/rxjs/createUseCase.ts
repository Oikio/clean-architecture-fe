import type { Observable, Subscription } from 'rxjs'
import { identity } from 'rxjs'
import { filter } from 'rxjs/operators'
import { _defaultDispatcher } from './createDispatcher'
import type { Intent, IntentBody } from './createIntent'
import { createIntent } from './createIntent'

interface UseCaseOptions {
  /**
   * If UseCase has intent to trigger it, then intentsStream would be filtered by the name of the UseCase.
   * If intent is true, createUseCase function callback will provide intent in returned object
   * True by default.
   */
  hasIntent?: boolean
}

type UseCaseLogic<SideEffects, IntentType = any> = {
  (
    /** Stream of all or related (if ops: {intent: true} was provided) intents */
    intentsStream: Observable<IntentBody<IntentType>>,
    /** Poor man's DI for side effects */
    sideEffects: SideEffects,
    /** UseCase name provided during setup */
    name: string
  ): Observable<any>
}

interface UseCaseInitOptions {
  /** Dispatch method provided by Dispatcher, by default takes one from services/dispatcherService */
  dispatch?: (intent: IntentBody<any>) => void
  /** Dispatcher stream, by default takes one from services/dispatcherService */
  dispatcher?: Observable<IntentBody>
  /** Local `module` variable for HMR, if not provided HMR will not work for this useCase */
  module?: any
}

interface UseCaseInitFunctionWithoutIntent<SideEffects> {
  (sideEffects: SideEffects, initOptions?: UseCaseInitOptions): {
    subscription: Subscription
    useCaseLogicStream: Observable<void>
  }
}

interface UseCaseInitFunction<SideEffects, Payload> {
  (sideEffects: SideEffects, initOptions?: UseCaseInitOptions): {
    intent: Intent<Payload>
    subscription: Subscription
    useCaseLogicStream: Observable<void>
  }
}

export function createUseCase<SideEffects>(
  name: string,
  useCaseLogic: UseCaseLogic<SideEffects>,
  useCaseOptions?: UseCaseOptions
): UseCaseInitFunctionWithoutIntent<SideEffects>

export function createUseCase<SideEffects, Payload>(
  name: string,
  useCaseLogic: UseCaseLogic<SideEffects, Payload>,
  useCaseOptions?: UseCaseOptions
): UseCaseInitFunction<SideEffects, Payload>

export function createUseCase<SideEffects, Payload>(
  name: string,
  useCaseLogic: UseCaseLogic<SideEffects, Payload>,
  { hasIntent = true }: UseCaseOptions = {}
): UseCaseInitFunction<SideEffects, Payload> | UseCaseInitFunctionWithoutIntent<SideEffects> {
  return (
    sideEffects: SideEffects,
    {
      dispatch = _defaultDispatcher().dispatch,
      dispatcher = _defaultDispatcher().dispatcher,
      module
    } = {}
  ) => {
    const useCaseLogicStream = useCaseLogic(
      dispatcher.pipe(hasIntent ? filter((intent: IntentBody) => intent.type === name) : identity),
      sideEffects,
      name
    )
    const subscription = useCaseLogicStream.subscribe()

    // HMR for useCases
    if (module?.hot) {
      module.hot.accept()
      module.hot.dispose(() => {
        subscription.unsubscribe()
      })
    }

    return {
      subscription,
      useCaseLogicStream,
      intent: hasIntent && dispatch ? createIntent<Payload>(name, dispatch) : undefined!
    }
  }
}
