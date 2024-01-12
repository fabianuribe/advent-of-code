function parseInput(input: string[]): { start: number[], pipeMap: string[] } {
  let start: number[] = [];

  input.forEach((line, idx) => {
    let s = line.indexOf('S');
    if (s >= 0) {
      start = [idx, s];
      return;
    }
  });
  return { start, pipeMap: input };
}


type Pipe = 'S' | '-' | '|' | 'L' | 'J' | '7' | 'F';

const moveMap: { [key in Pipe]: { x: number, y: number }[] } = {
  'S': [
    { y: -1, x: 0 },
    { y: 0, x: 1 },
    { y: 1, x: 0 },
    { y: 0, x: -1 }
  ],

  '-': [{ y: 0, x: -1 }, { y: 0, x: 1 }],
  '|': [{ y: -1, x: 0 }, { y: 1, x: 0 }],

  'L': [{ y: -1, x: 0 }, { y: 0, x: 1 }],
  'J': [{ y: -1, x: 0 }, { y: 0, x: -1 }],
  '7': [{ y: 1, x: 0 }, { y: 0, x: -1 }],
  'F': [{ y: 1, x: 0 }, { y: 0, x: 1 }],

};

function readMap(coord: { y: number, x: number }, inputMap: any[]): any {
  return inputMap[coord.y][coord.x];
}

function setVisited(coord: { y: number, x: number }, inputMap: any[]): any {
  return inputMap[coord.y][coord.x] = true;
}

function findNext(coord: { y: number, x: number }, pipeMap: string[], visited: boolean[][]) {
  const currentSymbol = readMap(coord, pipeMap) as Pipe;
  const moves = moveMap[currentSymbol];

  if (!moves) {
    console.log("No moves for symbol ", currentSymbol);
  }

  for (let move of moves) {
    let nextCoord = {
      y: coord.y + move.y,
      x: coord.x + move.x
    };


    if (readMap(nextCoord, visited)) {
      continue;
    }

    let char = readMap(nextCoord, pipeMap);
    if (char.match(/S|\-|\||L|J|7|F/g)) {
      return nextCoord;
    }
  }

  return null;
}

function countLoop(currentIdx: number[], pipeMap: string[], visited: boolean[][]): number {
  let acc = 0;
  let currentCoord: null | { y: number, x: number } = { y: currentIdx[0], x: currentIdx[1] };
  setVisited(currentCoord, visited);

  while (currentCoord) {
    currentCoord = findNext(currentCoord, pipeMap, visited);
    if (currentCoord) {
      setVisited(currentCoord, visited);
      acc += 1;
    }
  }
  return Math.ceil(acc / 2);
}

function createBooleanMatrix(n: number, m: number) {
  return Array.from({ length: n }, () => Array(m).fill(false));
}

function solve(input: string[]) {
  const { start, pipeMap } = parseInput(input);
  let visited = createBooleanMatrix(pipeMap.length, pipeMap[0].length);

  return countLoop(start, pipeMap, visited);
}

export default solve;
