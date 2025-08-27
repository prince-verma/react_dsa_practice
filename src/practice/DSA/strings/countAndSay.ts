// https://leetcode.com/problems/count-and-say/
// Constraints:
// 1 <= n <= 30

const generateRle = (str: string): string => {
  let count = 1;
  let lastChar = str[0];
  let result = "";

  for (let i = 1; i < str.length; i++) {
    const s = str[i];
    if (lastChar === s) {
      count++;
      continue;
    }
    result += `${count}${lastChar}`;
    lastChar = s;
    count = 1;
  }
  result += `${count}${lastChar}`;
  return result;
};

const cache: Map<number, string> = new Map();
function countAndSay(n: number): string {
  if (n === 1) return "1";
  if (cache.has(n)) {
    return cache.get(n)!;
  }

  const val = generateRle(countAndSay(n - 1));
  cache.set(n, val);
  return val;
}

console.log(countAndSay(1)); // "1"
console.log(countAndSay(2)); // "11"
console.log(countAndSay(3)); // "21"
console.log(countAndSay(4)); // "1211"
console.log(countAndSay(5)); // "111221"
// console.log(generateRle("21")); // "1211"
