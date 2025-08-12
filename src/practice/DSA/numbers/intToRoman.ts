// https://leetcode.com/problems/integer-to-roman/description/
// https://leetcode.com/problems/integer-to-roman/description/
function intToRoman(num: number): string {
  const romanToIntMapping: [string, number][] = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let result = "";
  for (let [key, value] of romanToIntMapping) {
    while (num >= value) {
      result += key;
      num -= value;
    }
  }
  return result;
}

// console.log("X", intToRoman(10));
// console.log("MMMDCCXLIX -- 3749 -", intToRoman(3749));
