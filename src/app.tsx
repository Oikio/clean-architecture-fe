import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  componentFromStreamWithConfig,
  compose,
  createEventHandlerWithConfig,
  mapPropsStreamWithConfig,
  toClass
} from 'recompose'
import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { Component, ComponentClass } from 'react'
import { mapPropsStream } from './utils/mapPropsStream'

// TODO: check if .value is safe dut to concurrency
const numbers$ = new BehaviorSubject<number[]>([1])
numbers$.subscribe(x => console.log(x))
numbers$.next([...numbers$.value, 2])
setTimeout(() => numbers$.next([...numbers$.value, 3]), 2000)

interface StateFormStream {
  numbers: number[]
}

const TestView: React.StatelessComponent<any> = props => (
  <div>{props.numbers}!</div>
)

const Test = compose(
  mapPropsStream<StateFormStream, {}>(props$ =>
    props$.combineLatest(numbers$, (props, numbers) => {
      return {
        ...props,
        numbers
      }
    })
  )
)(TestView)

const AppView: React.StatelessComponent<any> = props => (
  <div>
    <Test />
  </div>
)

const App = AppView

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)
