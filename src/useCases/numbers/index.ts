import { dispatcher } from 'services/dispatcher'
import { clearNumbers, numbersStream, updateNumbers } from 'state/numbers'
import { updateNumbersWarning } from 'state/numbersWarning'

import { clearNumbersUseCase } from './clear'
import { setNumbersLengthUseCase } from './setLength'
import { showNumbersWarningUseCase } from './showWarning'

clearNumbersUseCase(dispatcher, { clearNumbers })
setNumbersLengthUseCase(dispatcher, { updateNumbers })
showNumbersWarningUseCase(dispatcher, { numbersStream, updateNumbersWarning })
