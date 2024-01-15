function levenstein(a: string, b: string): number {
  let cache = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1));
  for (let aLen = 0; aLen < a.length + 1; aLen += 1) {
    for (let bLen = 0; bLen < b.length + 1; bLen += 1) {
      if (aLen == 0) {
        cache[aLen][bLen] = bLen;
      } else if (bLen == 0) {
        cache[aLen][bLen] = aLen;
      } else if (a[aLen - 1] == b[bLen - 1]) {
        cache[aLen][bLen] = cache[aLen - 1][bLen - 1];
      } else {
        cache[aLen][bLen] = Math.min(
          cache[aLen - 1][bLen - 1] + 1,
          cache[aLen - 1][bLen] + 1,
          cache[aLen][bLen - 1] + 1,
        );
      }
    }
  }
  return cache[a.length][b.length];
}

export default levenstein;
