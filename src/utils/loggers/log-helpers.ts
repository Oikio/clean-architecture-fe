export const log = process.env.NODE_ENV === 'development'
  ? (...args: any[]) => console.log(...args)
  : (...args: any[]) => { }

export const wrapLog =
  process.env.NODE_ENV === 'development'
    ? <T>(func: T, label: string = (func as any).name): T =>
      ((...args: any[]) => {
        console.group((func as any).name + ' ' + label || '')
        console.log('Arguments = ', args)
        const result = (func as any)(...args)
        console.log('Result = ', result)
        console.groupEnd()
        return result
      }) as any
    : <T>(func: T, label?: string) => func
