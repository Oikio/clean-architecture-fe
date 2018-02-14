import { BehaviorSubject, Subject } from 'rxjs'
import { tag } from 'rxjs-spy/operator/tag'

export const createState = <T>(name: string, startWith: T) => {
  const cell$ = new BehaviorSubject<T>(startWith)
  const stream$: Subject<T> = tag.call(cell$, `state/${name}`)
  return { cell$, stream$ }
}