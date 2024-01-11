function parseInput(input: string[]) {
  const lines = input.filter(line => !!line).map(line => line.split(' ').map(Number));
  return lines;
}

function predictNext(history: number[]): number {
  if (!history.filter(Number).length) {
    return 0;
  }

  let nextLevel = [];
  for (var i = 1; i < history.length; i += 1) {
    nextLevel.push(history[i] - history[i - 1]);
  }

  return history[0] - predictNext(nextLevel);
}



function solve(input: string[]) {
  const valueHistories = parseInput(input);

  const result = valueHistories.reduce((acc, history) => acc + predictNext(history), 0);
  return result;
}

export default solve;
