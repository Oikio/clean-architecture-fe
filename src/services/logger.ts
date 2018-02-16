import { create } from 'rxjs-spy'
import { combineLatest } from 'rxjs/operators/combineLatest'
import { tap } from 'rxjs/operators/tap'

import { dispatcher$ } from '../dispatcher'
import { numbers$ } from '../state/numbers'

// TODO: add logging for state and dispatcher
// console.log(numbers$.operator.tag)
numbers$
  .pipe(
    combineLatest([]),
    tap((state) => console.log('stateIs: ', state))
  )
  .subscribe()

dispatcher$
  .pipe(tap(({ type, payload }) => console.log(`Intent to ${type} with: `, payload)))
  .subscribe()

const spy = create()
spy.log()

if (module.hot) {
  module.hot.dispose(() => {
    spy.teardown()
  })
}
