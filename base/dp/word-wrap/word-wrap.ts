function wordWrap(text: string, lineWidth: number): number {
  let words = text.split(' ');
  let chars = words.map((word) => word.length);
  let cache: number[][] = Array.from({ length: words.length }, () => new Array(words.length));
  let cost = new Array(words.length);
  let result = new Array(words.length);

  // Compute Costs
  for (let i = 0; i < words.length; i += 1) {
    for (let j = i; j < words.length; j += 1) {
      let base = (j != 0 && cache[i][j - 1] != undefined) ? (cache[i][j - 1] - 1) : lineWidth;
      let remainingSpace = base - chars[j]

      if (remainingSpace >= 0) {
        cache[i][j] = remainingSpace;
      } else {
        cache[i][j] = Infinity;
      }
    }
  }

  // Minimize Square Cost
  for (let i = words.length - 1; i >= 0; i -= 1) {
    cost[i] = cache[i].reduceRight((curMin, cur, j) => {
      if (cur != Infinity && cur != undefined) {
        let curCost = Math.pow(cur, 2) + (cost[j + 1] || 0)
        if (curCost < curMin) {
          result[i] = j + 1;
          return curCost;
        }
      }
      return curMin;
    }, Infinity);
  }

  // Select words per line
  let justify = [];
  let i = 0;
  while (i < result.length) {
    justify.push(words.slice(i, result[i]));
    i = result[i]
  }

  console.log(justify);
  return cost[0];
}

export default wordWrap;
