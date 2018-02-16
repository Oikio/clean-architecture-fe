export const createNumbersArrOfLength = (n: number) => {
  let i = 0
  const arr = []
  while (i < n) {
    arr.push(i)
    i++
  }
  return arr
}
