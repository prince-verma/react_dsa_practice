// https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and/description/?envType=daily-question&envId=2025-07-30
/**
You are given an integer array nums of size n.

Consider a non-empty subarray from nums that has the maximum possible bitwise AND.

In other words, let k be the maximum value of the bitwise AND of any subarray of nums. Then, only subarrays with a bitwise AND equal to k should be considered.
Return the length of the longest such subarray.

The bitwise AND of an array is the bitwise AND of all the numbers in it.

A subarray is a contiguous sequence of elements within an array.

 

Example 1:

Input: nums = [1,2,3,3,2,2]
Output: 2
Explanation:
The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], so we return 2.
Example 2:

Input: nums = [1,2,3,4]
Output: 1
Explanation:
The maximum possible bitwise AND of a subarray is 4.
The longest subarray with that value is [4], so we return 1.
  */
function longestSubarray(nums: number[]): number {
  let maxNum = -Infinity;
  let maxLength = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxNum) {
      maxNum = nums[i];
      count = 1;
      maxLength = 1;
    } else if (nums[i] === maxNum) {
      count++;
      maxLength = Math.max(count, maxLength);
    } else {
      count = 0;
    }
  }
  // console.log(max);
  return maxLength;
}

console.log(longestSubarray([1, 2, 3, 4]));
console.log(longestSubarray([1, 2, 3, 3, 2, 2]));
