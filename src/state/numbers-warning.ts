import { createState } from '../utils/architecture/create-state'


export type NumbersWarningState = string | undefined
const numbersWarning = createState<NumbersWarningState>('numbersWarnings', undefined)
export const { stream: numbersWarningStream, update: updateNumbersWarning } = numbersWarning
