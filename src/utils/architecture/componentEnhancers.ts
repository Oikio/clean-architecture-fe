import { compose, withProps } from 'recompose'
import { Observable } from 'rxjs/observable'
import { FromObservable } from 'rxjs/observable/FromObservable'

import { mapPropsStream } from './mapPropsStream'

export const withGlobalStateAndIntents = <Props = {}, State = {}, Intents = {}>(
  stream?: (props$: FromObservable<Props>) => Observable<State>,
  intents?: Intents
) =>
  compose<Props, Props & State & Intents>(
    stream ? mapPropsStream(stream) : (i: any) => i,
    intents ? withProps(intents) : (i: any) => i,
  )
