/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const rows = matrix.length;
  const columns = matrix?.[0].length;
  if (rows !== columns || rows === 1) return matrix;

  for (let i = 0; i < rows; i++) {
    for (let j = i; j < columns; j++) {
      [matrix[j][i], matrix[i][j]] = [matrix[i][j], matrix[j][i]];
    }
  }

  matrix = matrix.map(item => item.reverse())
};

const arr1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const arr2 = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
];
rotate(arr1);
// rotate(arr2);
