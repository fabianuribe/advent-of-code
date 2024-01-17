function subsetSum(S: number[], T: number): boolean | number[] | null {
  let n = S.length;
  let cache: boolean[][] = Array.from({ length: n + 1 }, () => Array(T + 1).fill(false));

  cache[0][0] = true;

  for (let i = 1; i <= n; i++) {
    cache[i][0] = true; // Sum 0 can always be achieved with an empty subset
    for (let j = 1; j <= T; j++) {
      if (j < S[i - 1]) {
        cache[i][j] = cache[i - 1][j];
      } else {
        cache[i][j] = cache[i - 1][j] || cache[i - 1][j - S[i - 1]];
      }
    }
  }

  if (!cache[n][T]) {
    return [];
  }

  let subset: number[] = [];
  let i = n, j = T;
  while (i > 0 && j >= 0) {
    if (i > 0 && cache[i - 1][j]) {
      i--;
    } else {
      subset.push(S[i - 1]);
      j -= S[i - 1];
      i--;
    }
  }

  return subset;
}

export default subsetSum;
