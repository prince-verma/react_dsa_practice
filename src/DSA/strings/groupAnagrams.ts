// https://leetcode.com/problems/group-anagrams/
/**
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.

 

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]

 

Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.
 */

const FIRST_26_PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101,
];

function groupAnagrams(strs: string[]): string[][] {
  const group = new Map<number, string[]>();
  for (let str of strs) {
    let hash = 1;
    for (let char of str) {
      hash *= FIRST_26_PRIMES[char.charCodeAt(0) - 97];
    }
    if (group.has(hash)) {
      group.get(hash)?.push(str);
    } else {
      group.set(hash, [str]);
    }
  }
  return [...group.values()];
}

// const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
// // Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// console.log(groupAnagrams(strs));
