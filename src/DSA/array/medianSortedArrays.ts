/**
 * 
 * https://leetcode.com/problems/median-of-two-sorted-arrays/
 * @param nums1 Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 * @param nums2 
 */

const mergeArrays = (nums1: number[], nums2: number[]): number[] => {
  if (nums1.length === 0) {
    return nums2;
  }
  if (nums2.length === 0) {
    return nums1;
  }

  const result: number[] = [];
  let n1 = 0,
    n2 = 0;
  while (n1 < nums1.length && n2 < nums2.length) {
    if (nums1[n1] < nums2[n2]) {
      result.push(nums1[n1]);
      n1++;
    } else {
      result.push(nums2[n2]);
      n2++;
    }
  }

  if (n1 === nums1.length && n2 < nums2.length) {
    for (; n2 < nums2.length; n2++) {
      result.push(nums2[n2]);
    }
  }
  if (n2 === nums2.length && n1 < nums1.length) {
    for (; n1 < nums1.length; n1++) {
      result.push(nums1[n1]);
    }
  }
  return result;
};

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const finalArray = mergeArrays(nums1, nums2);
  const length = finalArray.length;

  if (length % 2 === 1) {
    return finalArray[Math.floor(finalArray.length / 2)];
  }
  const mid = Math.floor(length / 2);
  return (finalArray[mid - 1] + finalArray[mid]) / 2;
}
