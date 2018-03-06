import { dispatcher$ } from 'dispatcher'
import { clearNumbers, updateNumbers } from 'state/numbers'

import { clearNumberUseCase } from './clearNumbersUseCase'
import { setLengthOfNumberUseCase } from './setLengthOfNumberUseCase'

clearNumberUseCase(dispatcher$, { clearNumbers })
setLengthOfNumberUseCase(dispatcher$, { updateNumbers })
