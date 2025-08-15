// https://leetcode.com/problems/3sum-closest/description/
function threeSumClosest(nums: number[], target: number): number {
  if (nums.length <= 2) return nums.reduce((sum, item) => item + sum, 0);

  nums.sort((a, b) => a - b);

  let closestSum = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const newSum = nums[i] + nums[left] + nums[right];
      const minDiff = Math.abs(target - closestSum);
      const newDiff = Math.abs(target - newSum);
      if (newDiff <= minDiff) {
        closestSum = newSum;
      }
      if (newSum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return closestSum;
}

console.log(threeSumClosest([-1, 2, 1, -4], 1));
console.log(threeSumClosest([1, 1, 1, 0], -100));
console.log(threeSumClosest([0, 3, 97, 102, 200], 300));
