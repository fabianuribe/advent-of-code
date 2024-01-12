interface Galaxy {
  id: string,
  x: number,
  y: number
}

export function parseInput(input: string[]) {
  let result = []
  let emptyRows = [];
  let emptyCols = [];
  let colCheck = new Array(input[0].length);
  let galaxyCoords: Galaxy[] = [];

  for (let r = 0; r < input.length; r += 1) {
    const galaxies = []
    for (let c = 0; c < input[r].length; c += 1) {
      if (input[r][c] === '#') {
        galaxies.push(c);
      }
    }
    if (galaxies.length === 0) {
      emptyRows.push(r);
    }
    for (let galaxyIdx of galaxies) {
      colCheck[galaxyIdx] = true;
    }
  }

  for (let i = 0; i < colCheck.length; i += 1) {
    if (!colCheck[i]) {
      emptyCols.push(i);
    }
  }

  for (let r = 0; r < input.length; r += 1) {
    let newRow = new Array(colCheck.length + emptyCols.length).fill('.');
    if (emptyRows.indexOf(r) >= 0) {
      let emptyString = newRow.join('');
      result.push(emptyString);
      result.push(emptyString);
    } else {
      let pad = 0;
      for (let c = 0; c < input.length; c += 1) {
        if (emptyCols.indexOf(c) >= 0) {
          pad += 1;
        }
        let newColumn = c + pad;
        let isGalaxy = input[r][c] === '#';
        newRow[newColumn] = input[r][c];

        if (isGalaxy) {
          galaxyCoords.push({
            id: `${galaxyCoords.length}`,
            y: result.length,
            x: newColumn
          });
        }
      }
      result.push(newRow.join(''));
    }
  }
  return { galaxies: galaxyCoords, galaxyMap: result };
}



function shortestPath(a: Galaxy, b: Galaxy): number {
  let horixontalSteps = Math.abs(a.x - b.x);
  let verticalSteps = Math.abs(a.y - b.y);
  return horixontalSteps + verticalSteps;
}

function generatePairs(galaxies: Galaxy[]) {
  let pairs = [];
  for (let i = 0; i < galaxies.length; i += 1) {
    for (let j = i + 1; j < galaxies.length; j += 1) {
      pairs.push({a: galaxies[i], b: galaxies[j]});
    }
  }
  return pairs;
}


function solve(input: string[]) {
  const { galaxies } = parseInput(input);
  const pairs = generatePairs(galaxies); 
  const sum = pairs?.reduce((acc, pair) => acc + shortestPath(pair.a, pair.b), 0);
  return sum;
}

export default solve;
