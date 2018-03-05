import { dispatcher$ } from 'dispatcher'
import { clearNumbers, updateNumbers } from 'state/numbers'

import { clearNumberUseCase } from './clear'
import { setLengthOfNumberUseCase } from './setLength'

clearNumberUseCase(dispatcher$, { clearNumbers })
setLengthOfNumberUseCase(dispatcher$, { updateNumbers })
