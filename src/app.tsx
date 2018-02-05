import * as React from 'react'
import { Component, ComponentClass } from 'react'
import * as ReactDOM from 'react-dom'
import { compose, withStateHandlers } from 'recompose'
import { BehaviorSubject } from 'rxjs'

import { du } from './utils/du'
import { mapPropsStream } from './utils/mapPropsStream'

function* g() {
  yield () => 3
  yield () => 2 + 5
  yield () => 'some'
}
du(g())

// State
// We can keep observables for state as subjects even in components, at least for now
const numbers$ = new BehaviorSubject<number[]>([])

// Action
// Underscored are not bound, let it be a convention
const _clearNumbers = ($: typeof numbers$) =>
  () => $.next([])
const clearNumbers = _clearNumbers(numbers$)

const _nextNumber = ($: typeof numbers$) =>
  () => $.next([...numbers$.getValue(), $.getValue().length])
const nextNumber = _nextNumber(numbers$)

const _setLengthOfNumbers = ($: typeof numbers$) =>
  (number: number) => {
    let i = 0
    const arr = []
    while (i < number) {
      arr.push(i)
      i++
    }
    return $.next(arr)
  }
const setLengthOfNumbers = _setLengthOfNumbers(numbers$)

// UseCases
// TODO: how to work with actions, maybe it makes sense to bind them to streams in useCases?..

// Types for component
interface FromGlobalState {
  numbers: number[]
}

interface State {
  lengthOfArray: number
  updateLengthOfArray: (number: number) => void
}

type Props = FromGlobalState & State

// View
const TestView: React.StatelessComponent<Props> = props => (
  <div>
    <button onClick={clearNumbers}>clear</button>
    <button onClick={nextNumber}>next</button>
    <button onClick={() => setLengthOfNumbers(props.lengthOfArray)}>set</button>
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
  mapPropsStream<FromGlobalState>(props$ =>
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
