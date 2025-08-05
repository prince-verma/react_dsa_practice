// https://leetcode.com/problems/merge-intervals/description/?envType=problem-list-v2&envId=oizxjoit

function merge(intervals: number[][]): number[][] {
  const result: number[][] = [];

  intervals.sort((a: number[], b: number[]) => a[0] - b[0]);

  for (let i = 0; i < intervals.length; ) {
    let temp = intervals[i];
    let j = i + 1;
    for (; j < intervals.length; j++) {
      if (intervals[j][0] <= temp[1]) {
        temp = [
          Math.min(temp[0], intervals[j][0]),
          Math.max(temp[1], intervals[j][1]),
        ];
      } else {
        break;
      }
    }
    i = j;
    result.push(temp);
  }

  return result;
}

// const intervals = [
//   [1, 3],
//   [2, 6],
//   [8, 10],
//   [15, 18],
// ];
// // [[1,6],[8,10],[15,18]]
// const intervals1 = [
//   [1, 4],
//   [4, 5],
// ];
// const intervals2 = [
//   [1, 4],
//   [2, 3],
// ];
// // Output: [[1, 5]];

// console.log(merge(intervals));
// console.log(merge(intervals1));
// console.log(merge(intervals2));
