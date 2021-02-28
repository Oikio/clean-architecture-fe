import { createState } from '../utils/architecture/create-state'
import { createStateUpdater } from '../utils/architecture/create-state-updater'


export type NumbersState = number[]
const name = 'numbers'
const numbers = createState<NumbersState>(name, [])
export const { stream: numbersStream, update: updateNumbers } = numbers

export const clearNumbers = createStateUpdater(name, state => [], numbers.subject)
