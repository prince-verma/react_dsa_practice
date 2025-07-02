export default function sort(arr) {
  if (arr.length <= 1) return arr;

  for (let i = 1; i < arr.length; i++) {
    const curr = arr[i];
    let prev = i - 1;
    while (arr[prev] > curr && prev > -1) {
      arr[prev + 1] = arr[prev]
      prev--;
    }
    arr[prev+1] = curr
  }

  return arr;
}

// console.log("here comes in sort --", sort([2, 3, 9, 1, 4, 7, 6, -1, 8, -10]));
