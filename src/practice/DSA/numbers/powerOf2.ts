// https://leetcode.com/problems/reordered-power-of-2/description/?envType=daily-question&envId=2025-08-10
function* getPermutations(
  str: string,
  isFirstCall: boolean = false
): Generator<string> {
  if (str.length <= 1) {
    yield str;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === "0" && isFirstCall) continue;

    const remaining = str.slice(0, i) + str.slice(i + 1);
    for (const perm of getPermutations(remaining)) {
      yield char + perm;
    }
  }
}

function isPowOf2(num: number): boolean {
  if (num === 1) return true;
  while (num) {
    if (num % 2 !== 0) return false;
    num = num / 2;
    if (num === 1) return true;
  }
  return true;
}

function reorderedPowerOf2_1(n: number): boolean {
  if (n === 1) return true;
  const allNums = getPermutations(n.toString(), true);
  // const uniquePerms = new Set(getPermutations(input));
  // console.log('allNums', allNums)
  for (let num of allNums) {
    // console.log('num', num)
    if (isPowOf2(+num)) return true;
  }
  return false;
}

function reorderedPowerOf2(n: number): boolean {
  if (n === 1) return true;
  const sortDigits = (num: number): string =>
    num.toString().split("").sort().join();
  const target = sortDigits(n);
  for (let i = 0; i < 31; i++) {
    if (sortDigits(1 << i) === target) return true;
  }
  return false;
}
