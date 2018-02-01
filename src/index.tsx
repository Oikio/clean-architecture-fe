import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  componentFromStreamWithConfig,
  compose,
  createEventHandlerWithConfig
} from 'recompose'
import rxjsConfig from 'recompose/rxjsObservableConfig'
import { Subject, Observable } from 'rxjs'

const componentFromStream = componentFromStreamWithConfig(rxjsConfig)
const createEventHandler = createEventHandlerWithConfig(rxjsConfig)

// const numbers = new Subject<number[]>()
// numbers.subscribe({
//   next: console.log
// })
// numbers.next([1])

const Counter = componentFromStream((props$: any) => {
  let propsS: Observable<{}> = props$
  const { handler: increment, stream: increment$ } = createEventHandler<
    any,
    Observable<number>
  >()
  const { handler: decrement, stream: decrement$ } = createEventHandler<
    any,
    Observable<number>
  >()
  const count$ = Observable.merge(increment$.mapTo(1), decrement$.mapTo(-1))
    .startWith(0)
    .scan((count, n) => count + n, 0)

  return propsS.combineLatest(count$, (props, count) => (
    <div {...props}>
      Count: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  ))
})

const AppView: React.StatelessComponent<any> = props => {
  return (
    <div>
      Ns, {props.n}, {props.some}
      <Counter />
    </div>
  )
}

const App = compose()(AppView)

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)
