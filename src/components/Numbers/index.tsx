import { evenNumbers$, EvenNumbersState } from 'computedState/evenNumbers'
import * as React from 'react'
import { Component, ComponentClass } from 'react'
import { compose, withStateHandlers } from 'recompose'
import { combineLatest } from 'rxjs/operators'
import { numbers$, NumbersState } from 'state/numbers'
import { clearNumbersIntent } from 'useCases/numbers/clearNumbersUseCase'
import { setLengthOfNumbersIntent } from 'useCases/numbers/setLengthOfNumberUseCase'
import { withGlobalStateAndIntents } from 'utils/architecture/componentEnhancers'

import { NumbersView } from './NumbersView'

// Types for component
interface WithGlobalState {
  numbers: NumbersState
  evenNumbers: EvenNumbersState
}

interface WithIntents {
  setLengthOfNumbersIntent: typeof setLengthOfNumbersIntent
  clearNumbersIntent: typeof clearNumbersIntent
}

interface State {
  lengthOfArray: number
  updateLengthOfArray: (number: number) => void
}

export type Props = WithGlobalState & WithIntents & State

const enhance = compose<Props, {}>(
  withGlobalStateAndIntents<{}, WithGlobalState, WithIntents>(
    props$ => props$.pipe(
      combineLatest(numbers$, evenNumbers$, (props, numbers, evenNumbers) => ({
        ...props,
        numbers,
        evenNumbers
      }))
    ),
    { setLengthOfNumbersIntent, clearNumbersIntent }
  ),
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
