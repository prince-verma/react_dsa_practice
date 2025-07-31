export class MaxHeap {
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

  getMaxElement(): number {
    return this.arr[0] || 0;
  }

  getHeapSize(): number {
    return this.heapSize;
  }

  // Heapifies a sub-tree taking the
  // given index as the root.
  maxHeapify(i: number) {
    const left = this.left(i);
    const right = this.right(i);
    let largestIndex: number = i;
    if (left < this.heapSize && this.arr[left]! > this.arr[largestIndex]!) {
      largestIndex = left;
    }
    if (right < this.heapSize && this.arr[right]! > this.arr[largestIndex]!) {
      largestIndex = right;
    }
    if (largestIndex !== i) {
      [this.arr[i], this.arr[largestIndex]] = [
        this.arr[largestIndex],
        this.arr[i],
      ];
      this.maxHeapify(largestIndex);
    }
  }

  removeMax(): boolean {
    if (this.heapSize <= 0) return false;
    if (this.heapSize === 1) {
      this.arr[0] = null;
      this.heapSize--;
      return true;
    }
    this.arr[0] = this.arr[this.heapSize - 1];
    this.arr[this.heapSize - 1] = null;
    this.heapSize--;
    this.maxHeapify(0);
    return true;
  }

  insert(key: number): void {
    if (this.heapSize === this.maxSize) {
      console.log("Overflow:- Heap is already full");
      return;
    }

    let i = this.heapSize++;
    this.arr[i] = key;
    while (i !== 0 && this.arr[this.parent(i)]! < this.arr[i]!) {
      [this.arr[i], this.arr[this.parent(i)]] = [
        this.arr[this.parent(i)],
        this.arr[i],
      ];
      i = this.parent(i);
    }
  }

  updateValueAt(index: number, newVal: number): void {
    this.arr[index] = newVal;
    while (index !== 0 && this.arr[this.parent(index)]! < this.arr[index]!) {
      [this.arr[this.parent(index)], this.arr[index]] = [
        this.arr[index],
        this.arr[this.parent(index)],
      ];
      index = this.parent(index);
    }
    if(this.arr[this.left(index)]! > this.arr[index]! || this.arr[this.right(index)]! > this.arr[index]!){
      this.maxHeapify(index)
    }
  }

  delete(index: number): void {
    this.updateValueAt(index, Infinity);
    this.removeMax();
  }
}

// const testHeap: MaxHeap = new MaxHeap(10);
// const arr: number[] = [18, 17, 2, 99, 199, 7, 36, 92, 10, 28];
// console.log("arr  --- ", arr);
// arr.forEach((item) => testHeap.insert(item));
// // array in max-heap will be like --  [199, 99, 92, 36, 28, 18, 17, 10, 7, 2]
// // testHeap.removeMax();
// testHeap.updateValueAt(0, 1);
// console.log("testHeap  --- ", testHeap);
