function isAlphaNumeric(str: string): boolean {
  if (!str) return false;
  const isAlphabet = str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122;
  const isNum = str.charCodeAt(0) >= 48 && str.charCodeAt(0) <= 57;
  return isAlphabet || isNum;
}

function isPalindrome(s: string): boolean {
  if (s === " ") return true;
  s = s.toLowerCase();

  let l = 0,
    r = s.length - 1;
  while (l <= r) {
    while (!isAlphaNumeric(s[l]) && l < s.length) {
      l++;
    }
    while (!isAlphaNumeric(s[r]) && r >= 0) {
      r--;
    }
    if (s[l] !== s[r]) {
      return false;
    }
    if (s[l] === s[r]) {
      l++;
      r--;
    }
  }
  return true;
}
// console.log(isPalindrome("A man, a plan, a canal: Panama"));
// console.log(isPalindrome("race a car"));
// console.log(isPalindrome(" "));
