import { createState } from '../architecture'


export type NumbersWarningState = string

export const name = 'state.numbers-warnings'
export const initialState: NumbersWarningState = '';

const { cell, stream, update } = createState<NumbersWarningState>(name, initialState)

export const numbersWarning = cell;
export const numbersWarning$ = stream
export const updateNumbersWarning = update
