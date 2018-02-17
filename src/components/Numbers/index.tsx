import { evenNumbers$, EvenNumbersState } from 'computedState/evenNumbers'
import * as React from 'react'
import { Component, ComponentClass } from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
import { combineLatest } from 'rxjs/operators'
import { numbers$, NumbersState } from 'state/numbers'
import { clearNumbersIntent } from 'useCases/numbers/clear'
import { setNumberLengthIntent } from 'useCases/numbers/setLength'
import { mapPropsStream } from 'utils/architecture/mapPropsStream'

import { NumbersView } from './View'

// Types for component
interface WithGlobalState {
  numbers: NumbersState
  evenNumbers: EvenNumbersState
}

interface WithIntents {
  setNumberLengthIntent: typeof setNumberLengthIntent
  clearNumbersIntent: typeof clearNumbersIntent
}

interface State {
  lengthOfArray: number
  updateLengthOfArray: (number: number) => void
}

export type Props = WithGlobalState & WithIntents & State

const enhance = compose<Props, {}>(
  mapPropsStream<WithGlobalState>(props$ =>
    props$.pipe(
      combineLatest(numbers$, evenNumbers$, (props, numbers, evenNumbers) => ({
        ...props,
        numbers,
        evenNumbers
      }))
    )
  ),
  withProps({ setNumberLengthIntent, clearNumbersIntent }),
  withStateHandlers(
    { lengthOfArray: 1 },
    {
      updateLengthOfArray: props => (number: number) => ({
        lengthOfArray: number
      })
    }
  )
)

export const Numbers = enhance(NumbersView)
