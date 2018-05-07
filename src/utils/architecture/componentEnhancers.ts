import { compose, withProps } from 'recompose'
import { Observable } from 'rxjs'

import { mapPropsStream } from './mapPropsStream'

export const withStateAndIntents = <Props = {}, State = {}, Intents = {}>(
  stream?: (props: Observable<Props>) => Observable<State>,
  intents?: Intents
) =>
  compose<Props, Props & State & Intents>(
    stream ? mapPropsStream(stream) : (i: any) => i,
    intents ? withProps(intents) : (i: any) => i,
  )
