/**
 * https://leetcode.com/problems/pacific-atlantic-water-flow/?envType=problem-list-v2&envId=oizxjoit
 * There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

Example 1:

Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
Example 2:

Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
 

Constraints:

m == heights.length
n == heights[r].length
1 <= m, n <= 200
0 <= heights[r][c] <= 105
 */

function pacificAtlantic(heights: number[][]): number[][] {
  const result: number[][] = [];
  const rows: number = heights.length;
  const columns: number = heights[0].length;
  const directions: [number, number][] = [
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // top
    [1, 0], // bottom
  ];
  const topLeft: Set<string> = new Set();
  const bottomRight: Set<string> = new Set();
  const getKey = (r: number, c: number): string => `${r}_${c}`;

  function dfs(i: number, j: number, visited: Set<string>, prevHeight: number) {
    const stack = [[i, j]];
    while (stack.length) {
      const [r, c] = stack.pop()!;
      visited.add(getKey(r, c));
      for (const [di, dj] of directions) {
        const ni = di + r,
          nj = dj + c;
        if (
          ni >= 0 &&
          ni < rows &&
          nj >= 0 &&
          nj < columns &&
          !visited.has(getKey(ni, nj)) &&
          heights[ni][nj] >= heights[r][c]
        ) {
          stack.push([ni, nj]);
        }
      }
    }
    // // out of bounds
    // if (i < 0 || j < 0 || i > rows - 1 || j > columns - 1) return;
    // // already visited or current height < previous height
    // if (visited.has(getKey(i, j)) || heights[i][j] < prevHeight) return;
    // visited.add(getKey(i, j));
    // for (const [di, dj] of directions) {
    //   dfs(i + di, j + dj, visited, heights[i][j]);
    // }
  }
  // top && bottom boundary
  for (let i = 0; i < columns; i++) {
    dfs(0, i, topLeft, heights[0][i]);
    dfs(rows - 1, i, bottomRight, heights[rows - 1][i]);
  }
  // left && right boundary
  for (let i = 0; i < rows; i++) {
    dfs(i, 0, topLeft, heights[i][0]);
    dfs(i, columns - 1, bottomRight, heights[i][columns - 1]);
  }
  // console.log("topLeft - ", Array.from(topLeft));
  // console.log("bottomRight - ", Array.from(bottomRight));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      // console.log(r, c);
      if (topLeft.has(getKey(r, c)) && bottomRight.has(getKey(r, c))) {
        // console.log("hi - ", r, c);
        result.push([r, c]);
      }
    }
  }
  return result;
}

function pacificAtlanticUsingBfs(heights: number[][]): number[][] {
  const result: number[][] = [];
  const rows: number = heights.length;
  const columns: number = heights[0].length;
  const directions: [number, number][] = [
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // top
    [1, 0], // bottom
  ];
  const topLeftSet: Set<string> = new Set();
  const bottomRightSet: Set<string> = new Set();
  const getKey = (r: number, c: number): string => `${r}_${c}`;

  function bfs(queue: [number, number][], visited: Set<string>) {
    while (queue.length) {
      const [i, j] = queue.shift()!;
      visited.add(getKey(i, j));
      for (const [di, dj] of directions) {
        const ni = di + i,
          nj = dj + j;
        if (
          ni >= 0 &&
          ni < rows &&
          nj >= 0 &&
          nj < columns &&
          !visited.has(getKey(ni, nj)) &&
          heights[ni][nj] >= heights[i][j]
        ) {
          queue.push([ni, nj]);
        }
      }
    }
  }

  const topLeftQueue: [number, number][] = [];
  const bottomRightQueue: [number, number][] = [];
  // top && bottom boundary
  for (let i = 0; i < columns; i++) {
    topLeftQueue.push([0, i]);
    bottomRightQueue.push([rows - 1, i]);
  }
  // left && right boundary
  for (let i = 0; i < rows; i++) {
    topLeftQueue.push([i, 0]);
    bottomRightQueue.push([i, columns - 1]);
  }
  bfs(topLeftQueue, topLeftSet);
  bfs(bottomRightQueue, bottomRightSet);
  // console.log("topLeft - ", Array.from(topLeft));
  // console.log("bottomRight - ", Array.from(bottomRight));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      // console.log(r, c);
      if (topLeftSet.has(getKey(r, c)) && bottomRightSet.has(getKey(r, c))) {
        // console.log("hi - ", r, c);
        result.push([r, c]);
      }
    }
  }
  return result;
}

const arr: number[][] = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
];
// [
//   [9, 10, 14, 9, 2, 6, 16],
//   [0, 0, 4, 5, 16, 16, 15],
//   [10, 8, 16, 10, 12, 8, 11],
//   [3, 13, 15, 0, 19, 16, 5],
//   [13, 17, 1, 12, 11, 8, 14],
//   [14, 9, 11, 10, 5, 19, 11],
//   [15, 3, 14, 3, 9, 11, 5],
//   [9, 17, 5, 15, 5, 15, 7],
//   [12, 11, 10, 0, 9, 14, 19],
//   [9, 1, 4, 5, 8, 18, 18],
//   [1, 4, 17, 16, 5, 12, 18],
//   [18, 2, 0, 0, 2, 11, 5],
//   [1, 15, 8, 18, 13, 15, 13],
//   [11, 14, 4, 13, 3, 1, 1],
//   [4, 2, 11, 19, 17, 8, 11],
//   [4, 11, 10, 0, 1, 18, 11],
//   [11, 7, 14, 4, 7, 8, 9],
//   [12, 0, 0, 3, 6, 2, 12],
//   [0, 16, 3, 3, 5, 6, 6],
//   [6, 11, 17, 12, 18, 5, 15],
//   [16, 14, 8, 4, 10, 16, 6],
//   [9, 7, 2, 13, 5, 5, 5],
//   [14, 17, 19, 4, 7, 2, 5],
//   [11, 16, 18, 14, 8, 10, 12],
//   [5, 11, 10, 17, 2, 2, 13],
//   [7, 6, 12, 3, 5, 3, 12],
//   [12, 10, 0, 19, 3, 15, 12],
//   [13, 2, 12, 1, 1, 15, 19],
//   [11, 15, 10, 8, 14, 19, 8],
//   [16, 2, 2, 16, 5, 15, 16],
//   [9, 8, 2, 17, 15, 14, 16],
//   [17, 2, 17, 17, 0, 6, 3],
//   [3, 4, 13, 9, 1, 4, 0],
//   [1, 3, 13, 10, 14, 9, 4],
// ];
// [
//   [0, 6],
//   [1, 4],
//   [1, 5],
//   [22, 2],
//   [23, 2],
//   [30, 3],
//   [31, 0],
//   [31, 2],
//   [31, 3],
//   [32, 0],
//   [32, 1],
//   [32, 2],
//   [33, 0],
//   [33, 1],
//   [33, 2],
// ];
// console.log(pacificAtlanticUsingBfs(arr));
// console.log(pacificAtlantic(arr));
// [
//   [0, 4],
//   [1, 3],
//   [1, 4],
//   [2, 2],
//   [3, 0],
//   [3, 1],
//   [4, 0],
// ];
// const arrSingle: number[][] = [[1]];
// console.log(pacificAtlantic(arrSingle));
