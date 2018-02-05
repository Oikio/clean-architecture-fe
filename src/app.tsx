import * as React from 'react'
import { Component, ComponentClass } from 'react'
import * as ReactDOM from 'react-dom'
import { compose, withStateHandlers } from 'recompose'
import { BehaviorSubject } from 'rxjs'

import { mapPropsStream } from './utils/mapPropsStream'

// State
const numbers$ = new BehaviorSubject<number[]>([])

// Bound Actions
const clear = () => {
  numbers$.next([])
}
const nextNumber = () => numbers$.next([...numbers$.getValue(), numbers$.getValue().length])
const setLength = (number: number) => {
  let i = 0
  const arr = []
  while (i < number) {
    arr.push(i)
    i++
  }
  numbers$.next(arr)
}

// UseCases
// TODO: how to work with actions, maybe it makes sense to bind them to streams in useCases?..

// Types for component
interface NumbersFromState {
  numbers: number[]
}

interface State {
  lengthOfArray: number
  updateLengthOfArray: (number: number) => void
}

type Props = NumbersFromState & State

// View
const TestView: React.StatelessComponent<Props> = props => (
  <div>
    <button onClick={clear}>clear</button>
    <button onClick={nextNumber}>next</button>
    <button onClick={() => setLength(props.lengthOfArray)}>set</button>
    <input
      type="number"
      onInput={e => props.updateLengthOfArray(parseInt(e.currentTarget.value))}
      value={props.lengthOfArray}
    />
    <div>Numbers: {props.numbers.join(', ')}!</div>
  </div>
)

// Enhancer
const Test = compose<Props, {}>(
  mapPropsStream<NumbersFromState>(props$ =>
    props$.combineLatest(numbers$, (props, numbers) => {
      return {
        ...props,
        numbers
      }
    })
  ),
  withStateHandlers({
    lengthOfArray: 1
  }, {
      updateLengthOfArray: props => (number: number) => ({
        lengthOfArray: number
      })
    })
)(TestView)


// App
const AppView: React.StatelessComponent<any> = props => (
  <div>
    <Test />
  </div>
)
const App = AppView
const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
