import { dispatcher } from '../../dispatcher'
import { clearNumbers, numbersStream, updateNumbers } from '../../state/numbers'
import { updateNumbersWarning } from '../../state/numbers-warning'
import { clearNumbersUseCase } from './clear'
import { setNumbersLengthUseCase } from './set-length'
import { showNumbersWarningUseCase } from './show-warning'


clearNumbersUseCase(dispatcher, { clearNumbers })
setNumbersLengthUseCase(dispatcher, { updateNumbers })
showNumbersWarningUseCase(dispatcher, { numbersStream, updateNumbersWarning })
