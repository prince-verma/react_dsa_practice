// https://leetcode.com/problems/roman-to-integer/

function romanToInt(s: string): number {
  const map: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  let i = 0;
  while (i < s.length) {
    const currValue = map[s[i]];
    const nextValue = map[s[i + 1]] ?? 0;
    if (nextValue <= currValue) {
      result += currValue;
      i++;
    } else {
      result += nextValue - currValue;
      i += 2;
    }
  }
  return result;
}

// console.log("900", romanToInt("CM"));
// console.log("1994", romanToInt("MCMXCIV"));
// console.log("58", romanToInt("LVIII"));
// console.log("4", romanToInt("IV"));
