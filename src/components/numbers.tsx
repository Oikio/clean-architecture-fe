import * as React from 'react'
import { Component, ComponentClass } from 'react'
import { compose, withStateHandlers } from 'recompose'

import { numbers$, NumbersState } from '../state/numbers'
import { clear } from '../useCases/numbers/clear'
import { setLengthOfNumbers } from '../useCases/numbers/setLength'
import { mapPropsStream } from '../utils/architecture/mapPropsStream'

// Types for component
interface FromGlobalState {
  numbers: NumbersState
}

interface State {
  lengthOfArray: number
  updateLengthOfArray: (number: number) => void
}

type Props = FromGlobalState & State

// View
const NumbersView: React.StatelessComponent<Props> = props => (
  <div>
    <button onClick={clear}>clear</button>
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
const enhance = compose<Props, {}>(
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
)

export const Numbers = enhance(NumbersView)