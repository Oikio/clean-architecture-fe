import { clearNumbers, numbers$, updateNumbers } from '../../state/numbers'
import { updateNumbersWarning } from '../../state/numbers-warning'
import { clearNumbersUseCase } from './clear'
import { setNumbersLengthUseCase } from './set-length'
import { showNumbersWarningUseCase } from './show-warning'


export const startClearNumbersUseCase = () => clearNumbersUseCase({ clearNumbers })
export const startSetNumbersLengthUseCase = () => setNumbersLengthUseCase({ updateNumbers })
export const startShowNumbersWarningUseCase = () => showNumbersWarningUseCase({ numbers$, updateNumbersWarning })
