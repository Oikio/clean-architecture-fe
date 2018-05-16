import * as React from 'react'

import { Props } from '.'

export const NumbersView: React.ComponentType<Props> = ({
  numbers,
  evenNumbers,
  warning,
  lengthOfArray,
  clearNumbersIntent,
  setNumbersLengthIntent,
  updateLengthOfArray
}) =>
  <div className="pa4">
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
