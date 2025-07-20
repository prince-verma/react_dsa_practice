const bfsDirections: number[][] = [
  [0, -1], // left
  [0, 1], // right
  [-1, 0], // top
  [1, 0], // bottom
  // [1, 1],
  // [-1, -1],
  // [-1, 1],
  // [1, -1],
];

function bfsUsingQueue(arr: number[][], startR: number, startC: number): void {
  const rows = arr.length;
  const columns = arr[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => {
    return Array(columns).fill(false);
  });
  const queue: number[][] = [[startR, startC]];
  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    if (r < 0 || c < 0 || r > rows - 1 || c > columns - 1 || visited[r][c]) {
      continue;
    }
    visited[r][c] = true;
    console.log(`${r}_${c} -- ${arr[r][c]}`);
    for (const [dr, dc] of bfsDirections) {
      queue.push([r + dr, c + dc]);
    }
  }
}

// const matt1: number[][] = [
//   [1, 2, 2, 3, 5],
//   [3, 2, 3, 4, 4],
//   [2, 4, 5, 3, 1],
//   [6, 7, 1, 4, 5],
//   [5, 1, 1, 2, 4],
// ];
// bfsUsingQueue(matt1, 0, 0);
// console.log("-------------------------");
