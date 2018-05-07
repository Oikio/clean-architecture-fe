import { dispatcher } from 'services/dispatcher'
import { clearNumbers, updateNumbers } from 'state/numbers'

import { clearNumberUseCase } from './clearNumbers'
import { setLengthOfNumbersUseCase } from './setLengthOfNumbers'

clearNumberUseCase(dispatcher, { clearNumbers })
setLengthOfNumbersUseCase(dispatcher, { updateNumbers })
