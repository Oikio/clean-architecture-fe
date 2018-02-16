import { dispatcher$ } from 'dispatcher'
import { clear, updateNumbers } from 'state/numbers'

import { clearNumberUseCase } from './clear'
import { setLengthOfNumberUseCase } from './setLength'

clearNumberUseCase(dispatcher$, { clearNumbers: clear })
setLengthOfNumberUseCase(dispatcher$, { updateNumbers })