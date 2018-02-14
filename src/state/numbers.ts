import { createState } from '../utils/architecture/createState'
import { createStateUpdater } from '../utils/architecture/createStateUpdater'

type State = number[]
// const numbers$ = createState<State>('numbers', [])
const numbers = createState<State>('numbers', [])
const { cell$, stream$ } = numbers
export const numbers$ = stream$

export const clear = createStateUpdater((state) => [], cell$)
// TODO: find out why type it's not inherited from fn signature if it's even possible
export const setNumbers = createStateUpdater<State, State>((state, payload) => payload, cell$)