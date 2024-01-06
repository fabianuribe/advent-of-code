// --- Day 3: Gear Ratios ---

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

function checkAdjacentSymbols(schematic: string[], y: number, x: number): boolean {
  let hasAdjacentSymbol = false

  for (let d = 0; d < directions.length; d += 1) {
    // Check bounds
    if (
      x + directions[d][0] < 0 ||
      x + directions[d][0] >= schematic[y].length ||
      y + directions[d][1] < 0 ||
      y + directions[d][1] >= schematic.length
    ) {
      continue;
    }

    const current = schematic[y + directions[d][1]][x + directions[d][0]];

    // Check if its not another digit or an invalid symbol
    if (current && current !== '.' && !isNumber(current)) {
      hasAdjacentSymbol = true;
      break;
    }
  }

  return hasAdjacentSymbol;
}

function walk(schematic: string[]): number[] {
  let parts = [];
  let currentPart = 0;
  let isValidPart = false;

  for (let y = 0; y < schematic.length; y += 1) {
    for (let x = 0; x < schematic[y].length; x += 1) {
      if (isNumber(schematic[y][x])) {
        currentPart = (currentPart * 10) + parseInt(schematic[y][x]);
        if (!isValidPart) {
          isValidPart = checkAdjacentSymbols(schematic, y, x);
        }
      }

      if (!isNumber(schematic[y][x]) || x == schematic[y].length - 1) {
        if (isValidPart) {
          parts.push(currentPart);
        }
        currentPart = 0;
        isValidPart = false;
      }
    }
  }

  return parts;
}

function solve_part_one(schema: string[]): number {
  const validParts = Array.from(walk(schema)) || [];
  return validParts.reduce((acc, cur) => acc + cur, 0);
}

function loadInput(): string[] {
  const input = fs.readFileSync('./input.txt', 'utf-8');
  const lines = input.split(/\r?\n/).filter(line => line.length > 0);
  return lines;
}

function run() {
  const input = loadInput();
  const part_one_result = solve_part_one(input);
  console.log(part_one_result);
}

run();

// console.log(solve_part_one([
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
// ]) == 4361);
//
// console.log(solve_part_one([
//   '1+.......2',
//   '+606.....-',
//   '3#.......(4',
// ]) == 616);
//
// console.log(solve_part_one([
//   '1+........',
//   '..........',
//   '..........4',
// ]) == 1);
//
// console.log(solve_part_one([
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
// ]) == 413);
//
// console.log(solve_part_one([
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
// ]) == 925);
//
