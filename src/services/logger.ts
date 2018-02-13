import { create } from 'rxjs-spy'
import { Observable } from 'rxjs'

import { numbers$ } from '../state/numbers'

// TODO: add logging for state
// console.log(numbers$.operator.tag)
Observable.combineLatest([numbers$]).do(console.log).subscribe()

const spy = create()
spy.log()
