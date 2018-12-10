import * as React from 'react'
import { EvenNumbersState } from 'state/evenNumbers'
import { NumbersState } from 'state/numbers'
import { NumbersWarningState } from 'state/numbersWarning'
import { clearNumbersIntent } from 'useCases/numbers/clear'
import { setNumbersLengthIntent } from 'useCases/numbers/setLength'

export interface Props {
  numbers: NumbersState
  evenNumbers: EvenNumbersState
  warning: NumbersWarningState
  lengthOfArray: number
  setNumbersLength: typeof setNumbersLengthIntent
  clearNumbers: typeof clearNumbersIntent
  updateLengthOfArray: (number: number) => void
}

export const NumbersView: React.StatelessComponent<Props> = ({
  numbers,
  evenNumbers,
  warning,
  lengthOfArray,
  clearNumbers,
  setNumbersLength,
  updateLengthOfArray
}) =>
  <div className="pa4">
    <form onSubmit={e => { e.preventDefault(); setNumbersLength(lengthOfArray) }}>
      <p>
        Warning: {warning}
      </p>
      <button type="button" onClick={() => clearNumbers()}>clear</button>
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
