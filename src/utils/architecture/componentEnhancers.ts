import { compose, mapPropsStreamWithConfig, withProps } from 'recompose'
import { Observable, of } from 'rxjs'

const mapPropsStream = mapPropsStreamWithConfig({
  fromESObservable: of,
  toESObservable: t => t
})

export const withStateAndIntents = <Props = {}, State = {}, Intents = {}>(
  stream?: (props: Observable<Props>) => Observable<State>,
  intents?: Intents
) =>
  compose<Props & State & Intents, Props & State & Intents>(
    stream ? mapPropsStream(stream as any) : (i: any) => i,
    intents ? withProps(intents) : (i: any) => i,
  )