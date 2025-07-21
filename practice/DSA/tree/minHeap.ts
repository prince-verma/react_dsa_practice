export class MinHeap {
  private maxSize: number;
  private heapSize: number;
  private arr: (number | null)[];

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.heapSize = 0;
    this.arr = new Array(maxSize).fill(null);
  }

  parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  left(index: number): number {
    return 2 * index + 1;
  }

  right(index: number): number {
    return 2 * index + 2;
  }

  getMinElement(): number {
    return this.arr[0] || 0;
  }

  getHeapSize(): number {
    return this.heapSize;
  }

  // Heapifies a sub-tree taking the
  // given index as the root.
  minHeapify(i: number) {
    const left = this.left(i);
    const right = this.right(i);
    let smallestIndex: number = i;
    if (left < this.heapSize && this.arr[left]! < this.arr[smallestIndex]!) {
      smallestIndex = left;
    }
    if (right < this.heapSize && this.arr[right]! < this.arr[smallestIndex]!) {
      smallestIndex = right;
    }
    if (smallestIndex !== i) {
      [this.arr[i], this.arr[smallestIndex]] = [
        this.arr[smallestIndex],
        this.arr[i],
      ];
      this.minHeapify(smallestIndex);
    }
  }

  removeMin(): boolean {
    if (this.heapSize <= 0) return false;
    if (this.heapSize === 1) {
      this.arr[0] = null;
      this.heapSize--;
      return true;
    }
    this.arr[0] = this.arr[this.heapSize - 1];
    this.arr[this.heapSize - 1] = null;
    this.heapSize--;
    this.minHeapify(0);
    return true;
  }

  insert(key: number): void {
    if (this.heapSize === this.maxSize) {
      console.log("Overflow:- Heap is already full");
      return;
    }

    let i = this.heapSize++;
    this.arr[i] = key;
    while (i !== 0 && this.arr[this.parent(i)]! > this.arr[i]!) {
      [this.arr[i], this.arr[this.parent(i)]] = [
        this.arr[this.parent(i)],
        this.arr[i],
      ];
      i = this.parent(i);
    }
  }

  updateValueAt(index: number, newVal: number): void {
    this.arr[index] = newVal;
    while (index !== 0 && this.arr[this.parent(index)]! > this.arr[index]!) {
      [this.arr[this.parent(index)], this.arr[index]] = [
        this.arr[index],
        this.arr[this.parent(index)],
      ];
      index = this.parent(index);
    }
    if(this.arr[this.left(index)]! < this.arr[index]! || this.arr[this.right(index)]! < this.arr[index]!){
      this.minHeapify(index)
    }
  }

  delete(index: number): void {
    this.updateValueAt(index, -Infinity);
    this.removeMin();
  }
}

// const testHeap: MinHeap = new MinHeap(10);
// const arr: number[] = [18, 17, 2, 99, 199, 7, 36, 92, 10, 28];
// console.log("arr  --- ", arr);
// arr.forEach((item) => testHeap.insert(item));
// // array in max-heap will be like -- [2, 7, 10, 17, 18, 28, 36, 92, 99, 199]
// console.log("testHeap  --- ", testHeap);
// // testHeap.removeMin();
// testHeap.updateValueAt(3, 93);
// // testHeap.delete(7);
// console.log("testHeap  --- ", testHeap);
