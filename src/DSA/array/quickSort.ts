// Lomuto partition
function partition(arr: number[], left: number, right: number): number {
  let pivot = arr[right];
  let i = left - 1;

  for (let j = left; j <= right - 1; j++) {
    // If current element is smaller than or equal to pivot
    //     increment index of smaller element
    //     Swap arr[i] and arr[j]
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // Swap arr[i + 1] and arr[right]
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];

  return i + 1;
}

export function quickSort(arr: number[], left: number, right: number): void {
  if (left < right) {
    const pi = partition(arr, left, right);
    quickSort(arr, left, pi - 1);
    quickSort(arr, pi + 1, right);
  }
}

// const arr: number[] = [18, 17, 2, 99, 7, 199, 36, 92, 10, 28];
// // const arr: number[] = [10, 7, 8, 9, 1, 5];
// console.log("arr -- 1 - ", arr.toString());
// quickSort(arr, 0, arr.length - 1);
// console.log("arr -- 2 - ", arr.toString());
