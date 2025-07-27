function reverseBits(num: number): number {
  let result: number = 0;

  for (let i = 0; i < 32; i++) {
    result <<= 1;
    result = result | (num & 1);
    num >>= 1;
  }

  return result;
}
