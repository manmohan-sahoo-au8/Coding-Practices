const outerFun = (a) => {
  let b = 10
  const innerFun = () => {
    let sum = a+b
    console.log(`the sum of two no is ${sum}`)
  }
  return innerFun
}

let checkClouser = outerFun(10)
checkClouser()