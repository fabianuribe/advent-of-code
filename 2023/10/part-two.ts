
interface Coordinates {
  x: number,
  y: number
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

function readMap(coord: Coordinates, inputMap: any[]): any {
  return inputMap[coord.y] && inputMap[coord.y][coord.x];
}

function setVisited(coord: Coordinates, inputMap: any[]): any {
  return inputMap[coord.y][coord.x] = true;
}

function findNext(coord: Coordinates, pipeMap: string[], visited: boolean[][]) {
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
    if (char && char.match(/S|\-|\||L|J|7|F/g)) {
      return nextCoord;
    }
  }

  return null;
}

function getPath(currentIdx: number[], pipeMap: string[], visited: boolean[][]): Coordinates[] {
  let currentCoord: null | Coordinates = { y: currentIdx[0], x: currentIdx[1] };
  let path = [];
  while (currentCoord) {
    currentCoord = findNext(currentCoord, pipeMap, visited);
    if (currentCoord) {
      setVisited(currentCoord, visited);
      path.push(currentCoord)
    }
  }
  return path
}

function createBooleanMatrix(n: number, m: number) {
  return Array.from({ length: n }, () => Array(m).fill(false));
}

function shoeLace(a: Coordinates, b: Coordinates): number {
  return (a.x * b.y) - (a.y * b.x);
}

function enclosedTiles(path: Coordinates[]) {
  let sum = 0;
  for (let i = 0; i < path.length; i++) {
    const nextIndex = (i + 1) % path.length;
    sum += shoeLace(path[i], path[nextIndex]);
  }

  const area = Math.abs(sum / 2);
  const boundaryPoints = path.length;

  // Picks Theorem : Area = (lattice points inside the polygon) + (Latice Points on the Boundary/2) - 1
  // Solve for the insde points: I = Area - (Latice Points on the Boundary/2) + 1
  const insidePoints = area - (boundaryPoints / 2) + 1;

  return insidePoints;
}

function solve(input: string[]) {
  const { start, pipeMap } = parseInput(input);
  let visited = createBooleanMatrix(pipeMap.length, pipeMap[0].length);
  const path = getPath(start, pipeMap, visited);
  return enclosedTiles(path);
}

export default solve;
