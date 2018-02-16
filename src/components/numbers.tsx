import { evenNumbers$, EvenNumbersState } from 'computedState/evenNumbers'
import * as React from 'react'
import { Component, ComponentClass } from 'react'
import { compose, withStateHandlers } from 'recompose'
import { combineLatest } from 'rxjs/operators'
import { numbers$, NumbersState } from 'state/numbers'
import { clearNumbersIntent } from 'useCases/numbers/clear'
import { setNumberLengthIntent } from 'useCases/numbers/setLength'
import { mapPropsStream } from 'utils/architecture/mapPropsStream'

// Types for component
interface FromGlobalState {
  numbers: NumbersState
  evenNumbers: EvenNumbersState
}

interface State {
  lengthOfArray: number
  updateLengthOfArray: (number: number) => void
}

type Props = FromGlobalState & State

// View
const NumbersView: React.StatelessComponent<Props> = props =>
  <div>
    <button onClick={clearNumbersIntent}>clear</button>
    <button onClick={() => setNumberLengthIntent(props.lengthOfArray)}>set</button>
    <input
      type="number"
      onChange={e => props.updateLengthOfArray(parseInt(e.currentTarget.value, 10))}
      value={props.lengthOfArray}
    />
    <div>numbers: {props.numbers.join(', ')}!</div>
    <div>evenNumbers: {props.evenNumbers.join(', ')}!</div>
  </div>

const enhance = compose<Props, {}>(
  mapPropsStream<FromGlobalState>(props$ =>
    props$.pipe(
      combineLatest(numbers$, evenNumbers$, (props, numbers, evenNumbers) => ({
        ...props,
        numbers,
        evenNumbers
      }))
    )
  ),
  withStateHandlers(
    {
      lengthOfArray: 1
    },
    {
      updateLengthOfArray: props => (number: number) => ({
        lengthOfArray: number
      })
    }
  )
)

export const Numbers = enhance(NumbersView)
