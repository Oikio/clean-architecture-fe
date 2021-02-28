import { dispatcher } from '../../dispatcher'
import { clearNumbers, numbers$, updateNumbers } from '../../state/numbers'
import { updateNumbersWarning } from '../../state/numbers-warning'
import { clearNumbersUseCase } from './clear'
import { setNumbersLengthUseCase } from './set-length'
import { showNumbersWarningUseCase } from './show-warning'


export const startClearNumbersUseCase = () => clearNumbersUseCase(dispatcher, { clearNumbers })
export const startSetNumbersLengthUseCase = () => setNumbersLengthUseCase(dispatcher, { updateNumbers })
export const startShowNumbersWarningUseCase = () => showNumbersWarningUseCase(dispatcher, { numbers$, updateNumbersWarning })
