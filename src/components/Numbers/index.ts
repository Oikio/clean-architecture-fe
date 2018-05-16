import { compose, withStateHandlers } from 'recompose'
import { combineLatest } from 'rxjs/operators'
import { EvenNumbersState, evenNumbersStream } from 'state/evenNumbers'
import { NumbersState, numbersStream } from 'state/numbers'
import { NumbersWarningState, numbersWarningStream } from 'state/numbersWarning'
import { clearNumbersIntent } from 'useCases/numbers/clear'
import { setNumbersLengthIntent } from 'useCases/numbers/setLength'
import { withStateAndIntents } from 'utils/architecture/componentEnhancers'

import { NumbersView } from './NumbersView'

interface WithState {
  numbers: NumbersState
  evenNumbers: EvenNumbersState
  warning: NumbersWarningState
}

interface WithIntents {
  setNumbersLengthIntent: typeof setNumbersLengthIntent
  clearNumbersIntent: typeof clearNumbersIntent
}

interface WithLocalState {
  lengthOfArray: number
}

type WithHandlers = {
  updateLengthOfArray: (number: number) => WithLocalState
}

export type Props = WithState & WithIntents & WithLocalState & WithHandlers

const enhance = compose<Props, {}>(

  withStateAndIntents<{}, WithState, WithIntents>(
    propsStream => propsStream.pipe(
      combineLatest(numbersStream, evenNumbersStream, numbersWarningStream, (props, numbers, evenNumbers, warning) => ({
        ...props,
        numbers,
        evenNumbers,
        warning
      }))
    ),
    { setNumbersLengthIntent, clearNumbersIntent }
  ),

  withStateHandlers<WithLocalState, WithHandlers, WithState & WithIntents>(
    { lengthOfArray: 1 },
    {
      updateLengthOfArray: props => number => ({
        lengthOfArray: number
      })
    }
  )

)

export const Numbers = enhance(NumbersView)
