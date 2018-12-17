import * as React from 'react'
import { useObservable } from 'rxjs-hooks'
import { evenNumbersStream } from 'state/evenNumbers'
import { numbersStream } from 'state/numbers'
import { numbersWarningStream } from 'state/numbersWarning'
import { clearNumbersIntent } from 'useCases/numbers/clear'
import { setNumbersLengthIntent } from 'useCases/numbers/setLength'

import { NumbersView } from './NumbersView'


export const Numbers: React.StatelessComponent = () => {
  const numbers = useObservable(() => numbersStream)
  const evenNumbers = useObservable(() => evenNumbersStream)
  const warning = useObservable(() => numbersWarningStream, undefined)
  const [lengthOfArray, updateLengthOfArray] = React.useState(1)


  return numbers && evenNumbers
    ? <NumbersView
      numbers={numbers}
      evenNumbers={evenNumbers}
      warning={warning}
      lengthOfArray={lengthOfArray}
      clearNumbers={clearNumbersIntent}
      setNumbersLength={setNumbersLengthIntent}
      updateLengthOfArray={updateLengthOfArray}
    />
    : null
}
