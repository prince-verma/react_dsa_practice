// https://leetcode.com/problems/spiral-matrix/description/?envType=problem-list-v2&envId=oizxjoit

function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  const visited: Set<string> = new Set();
  const getKey = (i: number, j: number) => `${i}_${j}`;

  const recurFunc = (sr: number, er: number, sc: number, ec: number): void => {
    if (sr > er || sc > ec) return;

    for (let i = sc; i <= ec; i++) {
      const key = getKey(sr, i);
      if (!visited.has(key)) {
        visited.add(key);
        result.push(matrix[sr][i]);
      }
    }
    for (let i = sr + 1; i <= er - 1; i++) {
      const key = getKey(i, ec);
      if (!visited.has(key)) {
        visited.add(key);
        result.push(matrix[i][ec]);
      }
    }
    for (let i = ec; i >= sc; i--) {
      const key = getKey(er, i);
      if (!visited.has(key)) {
        visited.add(key);
        result.push(matrix[er][i]);
      }
    }
    for (let i = er - 1; i >= sr + 1; i--) {
      const key = getKey(i, sc);
      if (!visited.has(key)) {
        visited.add(key);
        result.push(matrix[i][sc]);
      }
    }
    return recurFunc(sr + 1, er - 1, sc + 1, ec - 1);
  };

  recurFunc(0, matrix.length - 1, 0, matrix[0].length - 1);

  return result;
}

// const matt = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// const matt = [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12],
// [13, 14, 15, 16],
// ];
// [1, 2, 3, 6, 9, 8, 7, 4, 5];
// console.log("here comes in ", spiralOrder(matt));
