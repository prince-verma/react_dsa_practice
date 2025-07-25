// to get smallest  K numbers
function maxHeapify(arr, n, index) {
  let largest = index;
  let left = (index * 2) + 1
  let right = (index * 2) + 2
  if (left < n && arr[left] > arr[largest]) {
    largest = left
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right
  }
  if (largest !== index) {
    [arr[largest], arr[index]] = [arr[index], arr[largest]]
    maxHeapify(largest, n, arr)
  }
}

// to get largest K numbers
function minHeapify(arr, n, index) {
  let smallest = index;
  let left = (index * 2) + 1
  let right = (index * 2) + 2
  if (left < n && arr[left] < arr[smallest]) {
    smallest = left
  }
  if (right < n && arr[right] < arr[smallest]) {
    smallest = right
  }
  if (smallest !== index) {
    [arr[smallest], arr[index]] = [arr[index], arr[smallest]]
    minHeapify(smallest, n, arr)
  }
}


function buildMaxHeap(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    maxHeapify(arr, n, i);
  }
}

function buildMinHeap(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    minHeapify(arr, n, i);
  }
}

function kSmallestNumbersSum(arr, k) {
  if (k === 0) return [];
  let heap = arr.slice(0, k);
  buildMaxHeap(heap);

  for (let i = k; i < arr.length; i++) {
    if (arr[i] < heap[0]) {
      heap[0] = arr[i];
      maxHeapify(heap, k, 0);
    }
  }
  return heap.reduce((acc, item) => item + acc, 0)
}

function kLargestNumbersSum(arr, k) {
  if (k === 0) return [];
  let heap = arr.slice(0, k);
  buildMinHeap(heap);

  for (let i = k; i < arr.length; i++) {
    if (arr[i] > heap[0]) {
      heap[0] = arr[i];
      minHeapify(heap, k, 0);
    }
  }
  return heap.reduce((acc, item) => item + acc, 0);
}

function findMinMaxSums(n, arr, k) {
  const totalSum = arr.reduce((acc, item) => acc + item, 0)
  const kSmallest = kSmallestNumbersSum(arr, k)
  const kLargest = kLargestNumbersSum(arr, k)

  return [totalSum - kSmallest, totalSum - kLargest]

}