// --- Day 3: Gear Ratios ---
// --- Part Two ---

import * as fs from 'fs';

const directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

function isNumber(char: string): boolean {
  return !!char && char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

function findGears(schematic: string[], y: number, x: number): string[] {
  const gears = [];

  for (let d = 0; d < directions.length; d += 1) {
    // Check bounds
    const currentY = y + directions[d][1];
    const currentX = x + directions[d][0];

    if (currentY < 0 || currentY >= schematic.length ||
      currentX < 0 || currentX >= schematic[y].length) {
      continue;
    }

    if (schematic[currentY][currentX] === '*') {
      gears.push(`${currentY}:${currentX}`)
    }
  }

  return gears;
}

function buildGearMap(schematic: string[]): { [key: string]: number[] } {
  let gearMap: { [key: string]: number[] } = {};
  let currentPart = 0;
  let currentGearIndices: Set<string> = new Set();

  for (let y = 0; y < schematic.length; y += 1) {
    for (let x = 0; x < schematic[y].length; x += 1) {
      if (isNumber(schematic[y][x])) {
        currentPart = (currentPart * 10) + parseInt(schematic[y][x]);
        findGears(schematic, y, x).forEach(idx => currentGearIndices.add(idx));
      }

      if (!isNumber(schematic[y][x]) || x == schematic[y].length - 1) {
        if (currentGearIndices.size > 0) {
          Array.from(currentGearIndices).forEach(idx => {
            gearMap[idx] = (gearMap[idx] || []).concat(currentPart);
          });
        }
        currentPart = 0;
        currentGearIndices = new Set();
      }
    }
  }
  return gearMap;
}

function solve_part_two(schema: string[]): number {
  const gearMap = buildGearMap(schema);
  let validGears: number[] = [];

  // Only Gears that have exaclty 2 parts are valid Gears
  Object.keys(gearMap).forEach((gear) => {
    if (gearMap[gear].length == 2) {
      validGears.push(gearMap[gear][0] * gearMap[gear][1]);
    }
  });

  return validGears.reduce((acc, cur) => acc + cur, 0);
}

function loadInput(): string[] {
  const input = fs.readFileSync('./input.txt', 'utf-8');
  const lines = input.split(/\n/);
  return lines;
}

function run() {
  const input = loadInput();
  const part_one_result = solve_part_two(input);
  console.log(part_one_result);
}

run();

// console.log(solve_part_two([
//   '467..114..',
//   '...*......',
//   '..35..633.',
//   '......#...',
//   '617*......',
//   '.....+.58.',
//   '..592.....',
//   '......755.',
//   '...$.*....',
//   '.664.598..',
// ]) == 467835);
//
// console.log(solve_part_two([
//   '1+.......2',
//   '+606.....-',
//   '3*.......(4',
// ]) == 1818);
//
// console.log(solve_part_two([
//   '1+........',
//   '..........',
//   '..........4',
// ]) == 0);
//
// console.log(solve_part_two([
//   '12.......*..',
//   '+.........34',
//   '.......-12..',
//   '..78........',
//   '..*....60...',
//   '78..........',
//   '.......23...',
//   '....90*12...',
//   '............',
//   '2.2......12.',
//   '.*.........*',
//   '1.1.......56',
// ]) == 6756 );
//
// console.log(solve_part_two([
//   '12.......*..',
//   '+.........34',
//   '.......-12..',
//   '..78........',
//   '..*....60...',
//   '78.........9',
//   '.5.....23..$',
//   '8...90*12...',
//   '............',
//   '2.2......12.',
//   '.*.........*',
//   '1.1..503+.56',
// ]) == 6756 );
