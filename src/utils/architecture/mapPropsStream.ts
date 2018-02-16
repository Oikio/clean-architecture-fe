import { Component, ComponentClass } from 'react'
import { mapPropsStreamWithConfig } from 'recompose'
import rxjsConfig from 'recompose/rxjsObservableConfig'
import { Observable } from 'rxjs/Observable'
import { FromObservable } from 'rxjs/observable/FromObservable'

// Types in recompose are wrong, you should get Observable in enhancer

type mapper<TInner, TOutter> = (input: TInner) => TOutter
interface ComponentEnhancer<TInner, TOutter> {
  (component: Component<TInner>): ComponentClass<TOutter>
}

const wronglyTypedMapPropsStream: any = mapPropsStreamWithConfig(rxjsConfig)
export const mapPropsStream = <TInner, TOutter = {}>(
  transform: mapper<FromObservable<TOutter>, Observable<TInner>>
): ComponentEnhancer<TInner, TOutter> => wronglyTypedMapPropsStream(transform)
