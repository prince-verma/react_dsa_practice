export function stringSum(str1, str2) {
  return +str1 + +str2;
}

export function stringSum1(str1, str2) {
  console.log("stringSum1 called with", str1, str2);
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw new TypeError("Both arguments must be strings");
  }
  let decimal1 = 0,
    decimal2 = 0,
    sumOfDecimals = "",
    maxDecimalLength = 0,
    carry = 0,
    result = "";
  [str1, decimal1 = ""] = str1.trim().split(".");
  [str2, decimal2 = ""] = str2.trim().split(".");

  if (decimal1 || decimal2) {
    if (!decimal1) {
      sumOfDecimals = decimal2;
      maxDecimalLength = decimal2.length;
    } else if (!decimal2) {
      sumOfDecimals = decimal1;
      maxDecimalLength = decimal1.length;
    } else {
      if (decimal1.length < decimal2.length) {
        [decimal2, decimal1] = [decimal1, decimal2];
      }
      maxDecimalLength = decimal1.length;
      decimal2 = decimal2.padEnd(decimal1.length, "0");
      sumOfDecimals = stringSum1(decimal1, decimal2);
      if (sumOfDecimals.length > maxDecimalLength) {
        carry = 1;
        sumOfDecimals = sumOfDecimals.slice(1);
      }
    }
  }

  for (
    let i = str1.length - 1, j = str2.length - 1;
    i >= 0 || j >= 0;
    i--, j--
  ) {
    let digit1 = +str1[i] || 0;
    let digit2 = +str2[j] || 0;
    let sum = digit1 + digit2 + carry;
    carry = sum >= 10 ? 1 : 0;
    result = (sum % 10) + result;
  }

  return `${carry || ""}${result}${sumOfDecimals ? "." + sumOfDecimals : ""}`;
}

export default stringSum1;
