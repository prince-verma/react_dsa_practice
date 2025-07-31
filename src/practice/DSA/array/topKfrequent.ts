// https://leetcode.com/problems/top-k-frequent-elements/
/**
 * 
 * Constraints:
1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.
 * @param nums 
 * @param k 
 * @returns 
 */
// can use heapsort here to optimize this
// Time Complexity: O(n log n) where n is the number of unique elements
// - Building the frequency map: O(n) where n is nums.length
// - Converting map to array and sorting: O(u log u) where u is number of unique elements
// - Overall: O(n + u log u) = O(n log n) in worst case when all elements are unique
// Space Complexity: O(n) 
// - Map storage: O(u) where u is number of unique elements
// - Array for sorting: O(u) 
// - Overall: O(u) = O(n) in worst case when all elements are unique
function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map<number, number>();
  nums.forEach((item) => {
    map.set(item, (map.get(item) ?? 0) + 1);
  })
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((item) => +item[0]);
}

// const nums: number[] = [1, 1, 1, 2, 2, 3];
// const k: number = 2;
// console.log(topKFrequent(nums, k)); // Output: [1,2]

// can be done into o(n log k)
// by creating a heap of size k