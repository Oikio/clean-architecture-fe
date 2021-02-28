import * as React from 'react'
import { useObservableState } from 'observable-hooks'

import { evenNumbers, evenNumbers$ } from '../../state/even-numbers'
import { numbers, numbers$ } from '../../state/numbers'
import { numbersWarning, numbersWarning$ } from '../../state/numbers-warning'
import { clearNumbersIntent } from '../../use-cases/numbers/clear'
import { setNumbersLengthIntent } from '../../use-cases/numbers/set-length'
import { Title } from '../title/title'

export const Numbers: React.FC = () => {
  const curNumbers = useObservableState(numbers$, numbers)
  const curEvenNumbers = useObservableState(evenNumbers$, evenNumbers)
  const warning = useObservableState(numbersWarning$, numbersWarning)
  const [lengthOfArray, updateLengthOfArray] = React.useState(1)


  return curNumbers && curEvenNumbers
    ? <div className="pa4">
      <Title>Numbers</Title>
      <form onSubmit={e => { e.preventDefault(); setNumbersLengthIntent(lengthOfArray) }}>
        <p>
          Warning: {warning}
        </p>
        <button type="button" onClick={() => clearNumbersIntent()}>clear</button>
        <button type="submit">set</button>
        <input
          type="number"
          onChange={e => updateLengthOfArray(parseInt(e.currentTarget.value, 10))}
          value={lengthOfArray}
        />
      </form>

      <br />
      <div><b>numbers:</b> {curNumbers.join(', ')}!</div>

      <br />
      <div><b>evenNumbers:</b> {curEvenNumbers.join(', ')}!</div>
    </div>

    : null
}
