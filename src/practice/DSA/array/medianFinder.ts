/**
 * 295. Find Median from Data Stream - https://leetcode.com/problems/find-median-from-data-stream/?envType=problem-list-v2&envId=oizxjoit
Hard
Topics
premium lock icon
Companies
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
 

Example 1:

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
 

Constraints:

-105 <= num <= 105
There will be at least one element in the data structure before calling findMedian.
At most 5 * 104 calls will be made to addNum and findMedian.
 */

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

export class MedianFinder {
  // left side or lower numbers array
  private maxHeap: number[] = [];
  // right side or higher numbers array
  private minHeap: number[] = [];

  // constructor() {}

  getParent(index: number): number {
    return Math.floor((index - 1) / 2);
  }
  getLeft(index: number): number {
    return index * 2 + 1;
  }
  getRight(index: number): number {
    return index * 2 + 2;
  }

  maxHeapify(arr: number[], index: number, n: number): void {
    let left = this.getLeft(index);
    let right = this.getRight(index);
    let largestIndex = index;

    if (left < n && arr[largestIndex] < arr[left]) {
      largestIndex = left;
    }
    if (right < n && arr[largestIndex] < arr[right]) {
      largestIndex = right;
    }
    if (index !== largestIndex) {
      [arr[index], arr[largestIndex]] = [arr[largestIndex], arr[index]];
      this.maxHeapify(arr, largestIndex, n);
    }
  }

  minHeapify(arr: number[], index: number, n: number): void {
    let left = this.getLeft(index);
    let right = this.getRight(index);
    let smallestIndex = index;

    if (left < n && arr[smallestIndex] > arr[left]) {
      smallestIndex = left;
    }
    if (right < n && arr[smallestIndex] > arr[right]) {
      smallestIndex = right;
    }
    if (index !== smallestIndex) {
      [arr[index], arr[smallestIndex]] = [arr[smallestIndex], arr[index]];
      this.minHeapify(arr, smallestIndex, n);
    }
  }

  addToMinHeap(num: number): void {
    this.minHeap.push(num);
    let idx = this.minHeap.length - 1;
    while (idx !== 0 && this.minHeap[this.getParent(idx)] > this.minHeap[idx]) {
      [this.minHeap[this.getParent(idx)], this.minHeap[idx]] = [
        this.minHeap[idx],
        this.minHeap[this.getParent(idx)],
      ];
      idx = this.getParent(idx);
    }
  }

  removeTopMinHeap(): void {
    this.minHeap[0] = this.minHeap.pop()!;
    this.minHeapify(this.minHeap, 0, this.minHeap.length);
  }

  addToMaxHeap(num: number): void {
    this.maxHeap.push(num);
    let idx = this.maxHeap.length - 1;
    while (idx !== 0 && this.maxHeap[this.getParent(idx)] < this.maxHeap[idx]) {
      [this.maxHeap[this.getParent(idx)], this.maxHeap[idx]] = [
        this.maxHeap[idx],
        this.maxHeap[this.getParent(idx)],
      ];
      idx = this.getParent(idx);
    }
  }

  removeTopMaxHeap(): void {
    this.maxHeap[0] = this.maxHeap.pop()!;
    this.maxHeapify(this.maxHeap, 0, this.maxHeap.length);
  }

  addNum(num: number): void {
    if (!this.maxHeap.length || num < this.maxHeap[0]) {
      this.addToMaxHeap(num);
    } else {
      this.addToMinHeap(num);
    }
    // console.log("num", num);
    // console.log("this.minHeap", this.minHeap.toString());
    // console.log("this.maxHeap", this.maxHeap.toString());
    if (this.maxHeap.length > this.minHeap.length + 1) {
      this.addToMinHeap(this.maxHeap[0]);
      this.removeTopMaxHeap();
    } else if (this.minHeap.length > this.maxHeap.length) {
      this.addToMaxHeap(this.minHeap[0]);
      this.removeTopMinHeap();
    }
    // console.log("this.minHeap", this.minHeap.toString());
    // console.log("this.maxHeap", this.maxHeap.toString());
  }

  findMedian(): number {
    // console.log("this.minHeap", this.minHeap);
    // console.log("this.maxHeap", this.maxHeap);
    if (this.minHeap.length === this.maxHeap.length) {
      return (this.minHeap[0] + this.maxHeap[0]) / 2;
    }
    return this.maxHeap[0];
  }
}

const operations = [
  "MedianFinder",
  "addNum",
  "findMedian",
  "addNum",
  "findMedian",
  "addNum",
  "findMedian",
  "addNum",
  "findMedian",
  "addNum",
  "findMedian",
  "addNum",
  "findMedian",
  "addNum",
  "findMedian",
  "addNum",
  "findMedian",
  "addNum",
  "findMedian",
  "addNum",
  "findMedian",
];
const inputs = [
  [],
  [1],
  [],
  [2],
  [],
  [3],
  [],
  [4],
  [],
  [5],
  [],
  [6],
  [],
  [7],
  [],
  [8],
  [],
  [9],
  [],
  [10],
  [],
];

const obj = new MedianFinder();
const output: (number | null)[] = [null];

for (let index = 1; index < operations.length; index++) {
  const operation = operations[index];
  const input = inputs[index];
  switch (operation) {
    case "addNum":
      obj.addNum(input[0]);
      output.push(null);
      break;
    case "findMedian":
      output.push(obj.findMedian());
      break;
  }
}

// console.log("operation", operations);
// console.log("input", inputs);
console.log(
  "expected OP 0-",
  [
    null,
    null,
    1.0,
    null,
    1.5,
    null,
    2.0,
    null,
    2.5,
    null,
    3.0,
    null,
    3.5,
    null,
    4.0,
    null,
    4.5,
    null,
    5.0,
    null,
    5.5,
  ].toString()
);
console.log("expected OP 1-", output.toString());
