/**
 * https://leetcode.com/problems/word-break/description/?envType=problem-list-v2&envId=oizxjoit
 * 139. Word Break
Solved
Medium
Topics
premium lock icon
Companies
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
 

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
 */

//  Greedy approach, works in most cases, but fails for overlapping words
// function wordBreak(s: string, wordDict: string[]): boolean {
//     const map = new Map()
//     wordDict.forEach(item => map.set(item, true))

//     if (s.length <= 1) return map.has(s)

//     let l = 0, r = 0
//     // console.log("map",map)//
//     while (r < s.length) {
//         const tempStr = s.slice(l, r + 1)
//         // console.log("tempStr - ", l, r, tempStr)
//         if (map.has(tempStr)) {
//             l = r+1
//         }
//         r++
//     }
//     // console.log(l, s.length, map)//
//     return l == s.length
// };

function wordBreak(s: string, wordDict: string[]): boolean {
  const dictSet = new Set(wordDict);

  if (s.length <= 1) return dictSet.has(s);

  const dp: boolean[] = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (dp[j] && dictSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
