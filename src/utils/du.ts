// WIP, thinking about API and async handling

export const du = (generator: Generator) => {
  let next = generator.next()
  while (!next.done) {
    console.log(next)
    try {
      const calledFunc = next.value()
      if (calledFunc.then) {
        calledFunc.then(() => {
          next = generator.next()
        }, (e: any) => {
          next = generator.next()
          console.error('Tried to call', next.value, 'got', e)
        })
      } else if (calledFunc.next) {
        console.error('generators call not implemented')
        next = generator.next()
      } else {
        next = generator.next()
      }
    }
    catch (e) {
      console.error('Tried to call', next.value, 'got', e)
      next = generator.next()
    }
  }
}

// export const update = () => { } // ? that's where we can bound actions
// export const select = () => { } // ?

// const DO_CALL = Symbol('DO_CALL')
// export const call = (func: Function, ...args: any[]) => ([DO_CALL, func, args]) // might be a promise
// const handleCall = (
//   func: (args?: any) => Function | Promise<any> | Generator,
//   args: any[]
// ) => {
//   try {
//     const calledFunc = func(...args)
//     if (calledFunc.then) {
//       calledFunc.catch(e => console.error('Tried to call', func, 'with', args, 'got', e))
//     } else if (func.next) {
//       console.error('generators call not implemented')
//     }
//   }
//   catch (e) {
//     console.error('Tried to call', func, 'with', args, 'got', e)
//   }


// }

// export const du = (generator: Generator) => {
//   let next = generator.next()
//   while (!next.done) {
//     console.log(next)
//     switch (next.value && next.value[0]) {
//       case DO_CALL:
//         handleCall(next.value[1], next.value[2])
//         break
//     }
//     next = generator.next()
//   }
// }