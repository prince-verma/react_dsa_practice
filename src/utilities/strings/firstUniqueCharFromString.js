/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const charsMap = {}
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charsMap[char] = {index: i, count: (charsMap?.[char]?.count || 0) +1} 
  }
  return Object.values(charsMap).find(item => item.count === 1)?.index ?? -1
};

console.log(firstUniqChar("aabb"));
console.log(firstUniqChar("loveleetcode"));
console.log(firstUniqChar("leetcode"));
