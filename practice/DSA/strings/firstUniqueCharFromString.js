/**
 * https://leetcode.com/problems/first-unique-character-in-a-string/
 * 387. First Unique Character in a String
Solved
Easy
Topics
premium lock icon
Companies
Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

 

Example 1:

Input: s = "leetcode"

Output: 0

Explanation:

The character 'l' at index 0 is the first character that does not occur at any other index.

Example 2:

Input: s = "loveleetcode"

Output: 2

Example 3:

Input: s = "aabb"

Output: -1

 

Constraints:

1 <= s.length <= 105
s consists of only lowercase English letters.
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const charsMap = {}
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charsMap[char] = { index: i, count: (charsMap?.[char]?.count || 0) + 1 }
  }
  return Object.values(charsMap).find(item => item.count === 1)?.index ?? -1
};

console.log(firstUniqChar("aabb"));
console.log(firstUniqChar("loveleetcode"));
console.log(firstUniqChar("leetcode"));
