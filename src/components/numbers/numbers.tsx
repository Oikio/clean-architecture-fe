import * as React from 'react'
import { useObservable } from 'rxjs-hooks'

import { evenNumbersStream } from '../../state/evenNumbers'
import { numbersStream } from '../../state/numbers'
import { numbersWarningStream } from '../../state/numbersWarning'
import { clearNumbersIntent } from '../../useCases/numbers/clear'
import { setNumbersLengthIntent } from '../../useCases/numbers/setLength'
import { Title } from '../Title/Title'

export const Numbers: React.FC = () => {
  const numbers = useObservable(() => numbersStream)
  const evenNumbers = useObservable(() => evenNumbersStream)
  const warning = useObservable(() => numbersWarningStream, undefined)
  const [lengthOfArray, updateLengthOfArray] = React.useState(1)


  return numbers && evenNumbers
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
      <div><b>numbers:</b> {numbers.join(', ')}!</div>

      <br />
      <div><b>evenNumbers:</b> {evenNumbers.join(', ')}!</div>
    </div>

    : null
}
