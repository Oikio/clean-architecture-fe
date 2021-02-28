import { Observable, Subscription } from 'rxjs'

export interface Intent<T = any> { type: string, payload: T }

export interface Reducer<T, U = any> { (state: T, payload: U): T }

export type UseCase<SideEffects, IntentType = any> = {
  (sideEffects: SideEffects): Subscription
}

export type UseCaseCallback<SideEffects, IntentType = any> = {
  (intentsStream: Observable<Intent<IntentType>>, sideEffects: SideEffects): Observable<any>
}

export type StateUpdaterLog = {
  name: string;
  byUseCase: string;
  payload: any;
};
