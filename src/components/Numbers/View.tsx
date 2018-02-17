import * as React from 'react'

import { Props } from '.'

export const NumbersView: React.StatelessComponent<Props> = ({
  clearNumbersIntent,
  evenNumbers,
  lengthOfArray,
  numbers,
  setNumberLengthIntent,
  updateLengthOfArray
}) =>
  <div>

    <button onClick={clearNumbersIntent}>clear</button>
    <button onClick={() => setNumberLengthIntent(lengthOfArray)}>set</button>
    <input
      type="number"
      onChange={e => updateLengthOfArray(parseInt(e.currentTarget.value, 10))}
      value={lengthOfArray}
    />

    <div>numbers: {numbers.join(', ')}!</div>
    <div>evenNumbers: {evenNumbers.join(', ')}!</div>

  </div>
