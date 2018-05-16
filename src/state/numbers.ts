import { createState } from 'utils/architecture/createState'
import { createStateUpdater } from 'utils/architecture/createStateUpdater'

export type NumbersState = number[]
const numbers = createState<NumbersState>('numbers', [])
export const { stream: numbersStream, update: updateNumbers } = numbers

export const clearNumbers = createStateUpdater(state => [], numbers.cell)
