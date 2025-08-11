class MinHeap {
  arr: number[];
  constructor() {
    this.arr = [];
  }

  parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }
  left(index: number): number {
    return index * 2 + 1;
  }
  right(index: number): number {
    return index * 2 + 2;
  }
  size(): number {
    return this.arr.length;
  }

  heapify(index: number) {
    let smallestIndex = index;
    let left = this.left(index);
    let right = this.right(index);
    if (left < this.arr.length && this.arr[smallestIndex] > this.arr[left]) {
      smallestIndex = left;
    }
    if (right < this.arr.length && this.arr[smallestIndex] > this.arr[right]) {
      smallestIndex = right;
    }
    if (smallestIndex !== index) {
      [this.arr[smallestIndex], this.arr[index]] = [
        this.arr[index],
        this.arr[smallestIndex],
      ];
      this.heapify(smallestIndex);
    }
  }

  push(num: number) {
    let index = this.arr.length;
    this.arr.push(num);
    while (index !== 0 && this.arr[index] < this.arr[this.parent(index)]) {
      let parent = this.parent(index);
      [this.arr[parent], this.arr[index]] = [this.arr[index], this.arr[parent]];
      index = parent;
    }
  }

  getMin(): number {
    if (this.arr.length === 0) return 0;
    if (this.arr.length <= 2) return this.arr.shift()!;
    [this.arr[0], this.arr[this.arr.length - 1]] = [
      this.arr[this.arr.length - 1],
      this.arr[0],
    ];
    const root = this.arr.pop()!;
    this.heapify(0);
    return root;
  }
}

function getMinCost(arr: number[]): number {
  if (arr.length == 0) return 0;
  if (arr.length == 1) return arr[0];
  const minHeap = new MinHeap();
  for (let num of arr) {
    minHeap.push(num);
  }

  let totalCost = 0;
  while (minHeap.size() > 1) {
    const firstMin = minHeap.getMin();
    const secondMin = minHeap.getMin();
    const cost = firstMin + secondMin;
    totalCost += cost;
    minHeap.push(cost);
  }
  return totalCost;
}

console.log(getMinCost([95, 37, 33, 19, 92, 94, 16, 2, 18, 50]));
console.log(getMinCost([10, 30, 20]));
