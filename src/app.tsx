import * as React from 'react'
import { Component, ComponentClass } from 'react'
import * as ReactDOM from 'react-dom'
import { compose } from 'recompose'
import { BehaviorSubject } from 'rxjs'

import { mapPropsStream } from './utils/mapPropsStream'

const numbers$ = new BehaviorSubject<number[]>([1])
numbers$.next([...numbers$.getValue(), 2])
setTimeout(() => numbers$.next([...numbers$.getValue(), 3]), 2000)

interface StateFormStream {
  numbers: number[]
}

const TestView: React.StatelessComponent<any> = props => (
  <div>{props.numbers}!</div>
)

const Test = compose(
  mapPropsStream<StateFormStream>(props$ =>
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
