// Time Complexity: O(log n) - height of the heap
// Space Complexity: O(log n) - recursion stack depth
function minHeapify(arr: number[], n: number, index: number): void {
  let smallestIndex = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  if (left < n && arr[smallestIndex] > arr[left]) {
    smallestIndex = left;
  }
  if (right < n && arr[smallestIndex] > arr[right]) {
    smallestIndex = right;
  }

  if (smallestIndex !== index) {
    [arr[smallestIndex], arr[index]] = [arr[index], arr[smallestIndex]];
    minHeapify(arr, n, smallestIndex);
  }
}

// Time Complexity: O(log n) - height of the heap
// Space Complexity: O(log n) - recursion stack depth
function maxHeapify(arr: number[], n: number, index: number): void {
  let largestIndex = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  if (left < n && arr[largestIndex] < arr[left]) {
    largestIndex = left;
  }
  if (right < n && arr[largestIndex] < arr[right]) {
    largestIndex = right;
  }
  if (largestIndex !== index) {
    [arr[index], arr[largestIndex]] = [arr[largestIndex], arr[index]];
    maxHeapify(arr, n, largestIndex);
  }
}

/**
 * Heap Sort Algorithm
 *
 * Time Complexity: O(n log n) in all cases (best, average, worst)
 * - Building heap: O(n) - though it looks like O(n log n), it's actually O(n)
 * - Extracting elements: O(n log n) - n elements × O(log n) heapify each
 * - Overall: O(n) + O(n log n) = O(n log n)
 *
 * Space Complexity: O(log n)
 * - In-place sorting: O(1) additional space
 * - Recursion stack: O(log n) for heapify calls
 * - Overall: O(log n)
 *
 * @param arr - Array to be sorted
 * @param isAscending - true for ascending order, false for descending order
 */
export function heapSort(arr: number[], isAscending: boolean = true): void {
  const n = arr.length;
  const heapify = isAscending ? maxHeapify : minHeapify;
  // build a min heap
  for (let i = Math.floor((n - 1) / 2); i >= 0; i--) {
    heapify(arr, n, i);
  }

  // sorting the array
  for (let i = n - 1; i >= 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]];
    heapify(arr, i, 0);
  }
}

const arr: number[] = [18, 17, 2, 99, 7, 199, 36, 92, 10, 28];
console.log("arr -- ", arr.toString());
heapSort(arr);
console.log("arr -- ", arr.toString());
heapSort(arr, false);
console.log("arr -- ", arr.toString());
const arr1: number[] = [0, 1];
heapSort(arr1, true);
console.log("arr -- ", arr1.toString());
