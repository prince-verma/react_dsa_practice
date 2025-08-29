// https://leetcode.com/problems/maximum-area-of-longest-diagonal-rectangle/?envType=daily-question&envId=2025-08-29
function areaOfMaxDiagonal(dimensions: number[][]): number {
  let maxDia = -Infinity;
  let maxArea = -Infinity;
  for (let [length, width] of dimensions) {
    const dia = Math.sqrt(length * length + width * width);
    if (dia > maxDia) {
      maxDia = dia;
      maxArea = length * width;
    }
    if (dia === maxDia) {
      maxArea = Math.max(maxArea, length * width);
    }
  }
  return maxArea;
}
