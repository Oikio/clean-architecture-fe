import { createState, createStateUpdater } from '../architecture'


export type NumbersState = number[]

export const name = 'state.numbers'
export const initialState: NumbersState = [];

const { cell, subject, stream, update } = createState<NumbersState>(name, initialState)

export const numbers = cell;
export const numbers$ = stream;
export const updateNumbers = update;
export const clearNumbers = createStateUpdater(name, () => initialState, subject)
