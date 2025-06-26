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
