import { create } from 'rxjs-spy/spy-factory'

export const createStreamsSpy = () => {
  const spy = create()
  spy.log({
    log: (message: string, ...args: any[]) => {
      if (/notification = next/.test(message)) {
        const tag = message.match(/Tag = (\w*(\/?\w*)*)/)
        console.group((tag && `STREAM: ${tag[1]} updated with:`) || ('COULD NOT GET TAG FROM: ' + message))
        console.log(...args)
        console.groupEnd()
      }
    }
  })

  return spy
}
