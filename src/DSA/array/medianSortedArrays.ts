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

/**
 * CORE CONCEPT EXPLANATION:
 *
 * The key insight is that for finding median, we don't need to actually merge arrays.
 * We just need to find the correct "cut" point in both arrays such that:
 *
 * 1. LEFT SIDE has exactly half the elements (or one more for odd total)
 * 2. ALL elements in LEFT SIDE ≤ ALL elements in RIGHT SIDE
 *
 * If we achieve this, then:
 * - For ODD total: median = max(left side)
 * - For EVEN total: median = average of max(left side) and min(right side)
 *
 * BINARY SEARCH PROPERTY:
 * - We search for the correct partition point in the smaller array
 * - For each partition in array1, array2's partition is determined automatically
 * - We can eliminate half the search space in each iteration
 *
 * EXAMPLE WALKTHROUGH:
 * nums1 = [1, 3], nums2 = [2]
 * Total = 3 elements, so left side should have (3+1)/2 = 2 elements
 *
 * Try partitionX = 1 (cut after index 0 in nums1):
 * nums1: [1 | 3]  (left: [1], right: [3])
 * nums2: [2 |]    (left: [2], right: [])
 * Combined left: [1, 2], Combined right: [3]
 * Check: max(left) = 2, min(right) = 3, and 2 ≤ 3 ✓
 * Result: median = max(left) = 2
 *
 * @param nums1 Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
 * @param nums2
 */

// Time Complexity: O(log(min(m, n))) where m and n are lengths of nums1 and nums2
// Space Complexity: O(1) - only using constant extra space
function findMedianSortedArrays1(nums1: number[], nums2: number[]): number {
  // STEP 1: Ensure nums1 is smaller for optimization (fewer binary search iterations)
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays1(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  const totalLength = m + n;
  const isEven = totalLength % 2 === 0;

  // STEP 2: Binary search bounds - we can cut nums1 anywhere from 0 to m
  let left = 0; // minimum cut position in nums1
  let right = m; // maximum cut position in nums1

  while (left <= right) {
    // STEP 3: Try cutting nums1 at partitionX
    const partitionX = Math.floor((left + right) / 2);

    // STEP 4: Calculate where to cut nums2 to get exactly half elements on left
    // Left side should have (total + 1) / 2 elements
    // If nums1 contributes partitionX elements, nums2 should contribute the rest
    const partitionY = Math.floor((totalLength + 1) / 2) - partitionX;

    // STEP 5: Find the boundary elements around our cuts
    // maxLeftX = largest element in left part of nums1
    // minRightX = smallest element in right part of nums1
    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === m ? Infinity : nums1[partitionX];

    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === n ? Infinity : nums2[partitionY];

    // STEP 6: Check if this partition is valid
    // Valid partition means: all left elements ≤ all right elements
    // This happens when: maxLeftX ≤ minRightY AND maxLeftY ≤ minRightX
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      // FOUND VALID PARTITION! Calculate median
      if (isEven) {
        // Even total: median = average of the two middle elements
        // Two middle elements are: max(left side) and min(right side)
        return (
          (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2
        );
      } else {
        // Odd total: median = the middle element = max(left side)
        return Math.max(maxLeftX, maxLeftY);
      }
    }
    // STEP 7: Adjust binary search based on why partition failed
    else if (maxLeftX > minRightY) {
      // nums1's left part is too large, move cut leftward
      right = partitionX - 1;
    } else {
      // nums1's left part is too small, move cut rightward
      left = partitionX + 1;
    }
  }

  throw new Error("Input arrays are not sorted");
}

/*
DETAILED WALKTHROUGH EXAMPLE:
nums1 = [1, 2], nums2 = [3, 4]
Total = 4 (even), so we need 2 elements on each side

Iteration 1:
- left=0, right=2, partitionX = (0+2)/2 = 1
- partitionY = (4+1)/2 - 1 = 1
- Cut visualization:
  nums1: [1 | 2]     (left: [1], right: [2])
  nums2: [3 | 4]     (left: [3], right: [4])
- Boundary values:
  maxLeftX = 1, minRightX = 2
  maxLeftY = 3, minRightY = 4
- Check condition: maxLeftX(1) ≤ minRightY(4) ✓ AND maxLeftY(3) ≤ minRightX(2) ✗
- Since maxLeftY > minRightX, we need more elements from nums1 in left side
- left = partitionX + 1 = 2

Iteration 2:
- left=2, right=2, partitionX = (2+2)/2 = 2
- partitionY = (4+1)/2 - 2 = 0
- Cut visualization:
  nums1: [1, 2 |]    (left: [1,2], right: [])
  nums2: [| 3, 4]    (left: [], right: [3,4])
- Boundary values:
  maxLeftX = 2, minRightX = ∞
  maxLeftY = -∞, minRightY = 3
- Check condition: maxLeftX(2) ≤ minRightY(3) ✓ AND maxLeftY(-∞) ≤ minRightX(∞) ✓
- Valid partition found!
- Combined left: [1,2], Combined right: [3,4]
- Median = (max(left) + min(right))/2 = (2 + 3)/2 = 2.5 ✓
*/

// Test cases
console.log("Test 1:", findMedianSortedArrays([1, 3], [2])); // Expected: 2
console.log("Test 2:", findMedianSortedArrays([1, 2], [3, 4])); // Expected: 2.5
console.log("Test 3:", findMedianSortedArrays([0, 0], [0, 0])); // Expected: 0
console.log("Test 4:", findMedianSortedArrays([], [1])); // Expected: 1
console.log("Test 5:", findMedianSortedArrays([2], [])); // Expected: 2
