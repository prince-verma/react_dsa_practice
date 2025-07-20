const directions: number[][] = [
  [0, -1], // left
  [0, 1], // right
  [-1, 0], // top
  [1, 0], // bottom
  // [1, 1],
  // [-1, -1],
  // [-1, 1],
  // [1, -1],
];

function dfsUsingStack(arr: number[][], startR: number, startC: number): void {
  const rows: number = arr.length;
  const columns: number = arr[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(columns).fill(false)
  );
  const stack: number[][] = [[startR, startC]];

  while (stack.length > 0) {
    const [r, c] = stack.pop()!;
    if (r < 0 || c < 0 || r > rows - 1 || c > columns - 1 || visited[r][c]) {
      continue;
    }
    visited[r][c] = true;
    console.log(`${r}_${c} -- ${arr[r][c]}`);
    for (const [di, dj] of directions) {
      stack.push([r + di, c + dj]);
    }
  }
}

function dfsUsingRecur(arr: number[][], startR: number, startC: number): void {
  const rows: number = arr.length;
  const columns: number = arr[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(columns).fill(false)
  );

  function dfs(r: number, c: number): void {
    if (r < 0 || c < 0 || r > rows - 1 || c > columns - 1 || visited[r][c]) {
      return;
    }
    visited[r][c] = true;
    console.log(`${r}_${c} -- ${arr[r][c]}`);
    for (const [di, dj] of directions) {
      dfs(r + di, c + dj);
    }
  }
  dfs(startR, startC);
}

// const matt: number[][] = [
//   [1, 2, 2, 3, 5],
//   [3, 2, 3, 4, 4],
//   [2, 4, 5, 3, 1],
//   [6, 7, 1, 4, 5],
//   [5, 1, 1, 2, 4],
// ];
// dfsUsingStack(matt, 2, 3);
// console.log("-------------------------");
// dfsUsingRecur(matt, 0, 0);
