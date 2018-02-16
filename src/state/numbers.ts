import { createState } from '../utils/architecture/createState'
import { createStateUpdater } from '../utils/architecture/createStateUpdater'

export type NumbersState = number[]
const numbers = createState<NumbersState>('numbers', [])
const { cell$ } = numbers
export const { stream$: numbers$, update: updateNumbers } = numbers

export const clear = createStateUpdater((state) => [], cell$)