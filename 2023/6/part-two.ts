function difference(currentTime: number, totalTime: number, recordDistance: number): number {
  const currentDistance = currentTime * (totalTime - currentTime);
  return currentDistance - recordDistance;
}

function parseInput(input: string[]): { times: number, distances: number } {
  const times = Number(input[0].match(/\d+/g)?.join(''));
  const distances = Number(input[1].match(/\d+/g)?.join(''));
  return { times, distances }
}

function count(recordDistance: number, totalTime: number): number {
  let c = 0;
  for (let i = 0; i <= totalTime; i += 1) {
    if (difference(i, totalTime, recordDistance) > 0) {
      c += 1;
    } else if (c) {
      break;
    }
  }
  return c;
}

function solve(input: string[]) {
  const { times, distances } = parseInput(input);
  return count(distances, times);
}

export default solve;

