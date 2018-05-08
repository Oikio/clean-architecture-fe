import { EvenNumbersState, evenNumbersStream } from 'computedState/evenNumbers'
import { compose, withStateHandlers } from 'recompose'
import { combineLatest } from 'rxjs/operators'
import { NumbersState, numbersStream } from 'state/numbers'
import { clearNumbersIntent } from 'useCases/numbers/clearNumbers'
import { setLengthOfNumbersIntent } from 'useCases/numbers/setLengthOfNumbers'
import { withStateAndIntents } from 'utils/architecture/componentEnhancers'

import { NumbersView } from './NumbersView'

// Types for component
interface WithState {
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

export type Props = WithState & WithIntents & State

const enhance = compose<Props, {}>(
  withStateAndIntents<{}, WithState, WithIntents>(
    propsStream => propsStream.pipe(
      combineLatest(numbersStream, evenNumbersStream, (props, numbers, evenNumbers) => ({
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
