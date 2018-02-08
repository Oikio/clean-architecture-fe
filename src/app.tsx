import * as React from 'react'
import { Component, ComponentClass } from 'react'
import * as ReactDOM from 'react-dom'
import { compose, withStateHandlers } from 'recompose'
import { BehaviorSubject, Subject } from 'rxjs'
import { mapPropsStream } from './utils/mapPropsStream'


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

const _setNumbersArr = ($: typeof numbers$) => (arr: number[]) => $.next(arr)
const setNumbersArr = _setNumbersArr(numbers$)


// UseCases
const setLengthOfNumbers$ = new Subject<number>()
const createArr = (n: number) => {
  let i = 0
  const arr = []
  while (i < n) {
    arr.push(i)
    i++
  }
  return arr
}
const _setLengthOfNumbers = (di: { setNumbersArr: (typeof setNumbersArr) }) => {
  setLengthOfNumbers$
    .map(createArr)
    .do(setNumbersArr)
    .subscribe()

  return (n: number) => setLengthOfNumbers$.next(n)
}

const setLengthOfNumbers = _setLengthOfNumbers({ setNumbersArr })


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
      onChange={e => props.updateLengthOfArray(parseInt(e.currentTarget.value))}
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
  withStateHandlers(
    {
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
