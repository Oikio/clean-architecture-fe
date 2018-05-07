import { compose, mapPropsStreamWithConfig, withProps } from 'recompose'
import rxjsConfig from 'recompose/rxjsObservableConfig'
import { Observable } from 'rxjs'

// import { mapPropsStream } from './mapPropsStream'

export const mapPropsStream = mapPropsStreamWithConfig(rxjsConfig)

export const withStateAndIntents = <Props = {}, State = {}, Intents = {}>(
  stream?: (props: Observable<Props>) => Observable<State>,
  intents?: Intents
) =>
  compose<Props, Props & State & Intents>(
    stream ? mapPropsStream(stream as any) : (i: any) => i,
    intents ? withProps(intents) : (i: any) => i,
  )
