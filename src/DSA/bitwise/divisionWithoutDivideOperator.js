// 29. Divide Two Integers
// Medium
// Topics
// premium lock icon
// Companies
// Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

// The integer division should truncate toward zero, which means losing its fractional part. For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.

// Return the quotient after dividing dividend by divisor.

// Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the quotient is strictly less than -231, then return -231.

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */

// const MAX_INT = 2 ** 31 - 1;
// const MIN_INT = -(2 ** 31);

// var divide = function (dividend, divisor) {
//   if (dividend === MIN_INT && divisor === -1) return MAX_INT;
//   if (dividend === MIN_INT && divisor === 1) return MIN_INT;
//   if (divisor === 0) return dividend >= 0 ? Infinity : -Infinity;
//   const isNegative = (dividend < 0) !== (divisor < 0);

//   dividend = Math.abs(dividend)
//   divisor = Math.abs(divisor)

//   let val = divisor,
//     prevVal = 0,
//     tempDividend = dividend;
//   let shiftCount = 0;
//   let quotient = 0;


//   while (val <= tempDividend) {
//     prevVal = val;
//     val = val << 1;
//     shiftCount++;
//     if (val > tempDividend) {
//       tempDividend -= prevVal;
//       val = divisor;
//       quotient += 1 << --shiftCount;
//       shiftCount = 0;
//     }
//   }

//   return isNegative ? -quotient : quotient;
// };


const MAX_INT = 2 ** 31 - 1;
const MIN_INT = -(2 ** 31)-1;

var divide = function (dividend, divisor) {
  if (dividend === MIN_INT && divisor === -1) return MAX_INT;
  if (dividend === MIN_INT && divisor === 1) return MIN_INT;
  if (divisor === 0) return dividend >= 0 ? Infinity : -Infinity;

  const isNegative = (dividend < 0) !== (divisor < 0);

  let dvd = Math.abs(dividend);
  let dvs = Math.abs(divisor);
  let quotient = 0;

  for (let i = 31; i >= 0; i--) {
    if ((dvd >>> i) >= dvs) {
      dvd -= dvs << i;
      quotient += 1 << i;
    }
  }

  let result = isNegative ? -quotient : quotient;
  return Math.min(Math.max(result, MIN_INT), MAX_INT);
};

// console.log(divide(58, 5));
// console.log(divide(10, -10));
// console.log(divide(10, 0));
// console.log(divide(0, 0));
// console.log(divide(-0, 0));
// console.log(divide(-0, 10));
// console.log(divide(7, -3));
// console.log(divide(-7, 3));
// console.log(divide(-7, -3));

export default divide;
