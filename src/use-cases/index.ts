import { Subscription } from 'rxjs'

import {
  startClearNumbersUseCase,
  startSetNumbersLengthUseCase,
  startShowNumbersWarningUseCase,
} from './numbers'

const disposeBag = new Subscription();

disposeBag.add(startClearNumbersUseCase());
disposeBag.add(startSetNumbersLengthUseCase());
disposeBag.add(startShowNumbersWarningUseCase());
