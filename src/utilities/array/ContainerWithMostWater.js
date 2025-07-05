/**
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.
Constraints:

n == height.length
2 <= n <= 105
0 <= height[i] <= 104

 */

/**
 * @param {number[]} height
 * @return {number}
 */
const area = (l, b) => l * b;

var maxArea = function (height) {
  if (height.length === 1) return 0;

  let first = 0,
    last = height.length - 1;
  let result = 0;
  while (first < last) {
    const b = height[first] < height[last] ? height[first] : height[last];
    const l = last - first;
    result = Math.max(result, area(l, b));
    if (height[first] < height[last]) {
      first++;
    } else {
      last--;
    }
  }
  return result;
};

const arr = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(arr));
