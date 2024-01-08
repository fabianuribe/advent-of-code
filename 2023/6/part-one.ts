import { receiveMessageOnPort } from "worker_threads";

function difference(currentTime: number, totalTime: number, recordDistance: number): number {
  const currentDistance = currentTime * (totalTime - currentTime);
  return currentDistance - recordDistance;
}

function parseInput(input: string[]): { times: number[], distances: number[] } {
  const times = input[0].match(/\d+/g)?.map(Number) || [];
  const distances = input[1].match(/\d+/g)?.map(Number) || [];
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
  let total = 0;

  if (times.length !== distances.length) {
    return null;
  }

  for (let i = 0; i < times.length; i += 1 ) {
    total = (total || 1) * count(distances[i], times[i]);
  }

  return total;
}

export default solve;


