export function sum(a) {
  let totalSum = a;
  function func(b) {
    totalSum += b;
    return func;
  }
//   func.toString = function () {
//     return totalSum;
//   };
  func[Symbol.toPrimitive] = function (hint) {
    return totalSum;
  };
  return func;
}

// --------------------------------------------------------------------------------------

const newSum = (a,b,c,d) => {
  return a + b + c + d;
}

const curry = (func) => {
  const curried = (...args) => {
    if(args.length >= func.length) {
      return func(...args);
    }
    return (...args2) => {
      return curried(...args, ...args2);
    }
  }
  return curried
}

const curriedSum = curry(newSum);
// console.log(curriedSum(1)(2)(3)(4)); // 10
// console.log(curriedSum(1)(2)(3,4)); // 10
// console.log(curriedSum(1)(2,3,4)); // 10
// console.log(curriedSum(1,2,3,4)); // 10

// curry -- multiple, 3,5, 6