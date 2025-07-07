/**
 * 5. Longest Palindromic Substring
Medium
Topics
premium lock icon
Companies
Hint
Given a string s, return the longest palindromic substring in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.

 */

function checkAndReturnPalindrome (str, left, right) {
  let result =  ""
  if(left === right){
    result = str[left]
    left--
    right++
  }
  while(left >= 0 && right < str.length && str[left] === str[right] ){
    result = str[left] + result + str[right]
    left--;
    right++;
  }
  return result
}

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(str) {
  let longestStr = ""
  for(let i=0; i< str.length; i++){
    const evenStr = checkAndReturnPalindrome(str, i, i+1)
    const oddStr = checkAndReturnPalindrome(str, i, i)
    if(evenStr.length >= oddStr.length && evenStr.length >= longestStr.length) {
      longestStr = evenStr
    } else if(oddStr.length > evenStr.length && oddStr.length >= longestStr.length) {
      longestStr = oddStr
    }
    console.log('-here comes --- eve', evenStr)
    console.log('-here comes --- odd', oddStr)
    console.log('-here comes --- longestStr', longestStr)
  }
  return longestStr
};

// console.log(longestPalindrome("maam"))
// console.log(longestPalindrome("cbbd"))
// console.log(longestPalindrome("babad"))
// console.log(longestPalindrome("aacabdkacaa"))


// /**
//  * @param {string} s
//  * @return {string}
//  */
// var longestPalindrome = function(s) {
//     if (!s) {
//         return "";
//     }

//     function expandAroundCenter(s, left, right) {
//         while (left >= 0 && right < s.length && s[left] === s[right]) {
//             left--;
//             right++;
//         }
//         return right - left - 1;
//     }

//     let start = 0;
//     let end = 0;

//     for (let i = 0; i < s.length; i++) {
//         const odd = expandAroundCenter(s, i, i);
//         const even = expandAroundCenter(s, i, i + 1);
//         const max_len = Math.max(odd, even);

//         if (max_len > end - start) {
//             start = i - Math.floor((max_len - 1) / 2);
//             end = i + Math.floor(max_len / 2);
//         }
//     }

//     return s.substring(start, end + 1);    
// };