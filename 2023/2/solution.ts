// --- Day 2: Cube Conundrum ---
// https://adventofcode.com/2023/day/2

import * as fs from 'fs';

const gameSetRegexp = /.(\d*) (blue|red|green).?/g;

function parseInput(input: string[]): { id: number, blue: number, green: number, red: number }[] {
  const games = input.filter(line => line).map(line => {
    const gameObj: { id?: number, blue?: number, green?: number, red?: number } = {};
    const game = line.split(':');
    gameObj.id = parseInt(game[0].slice(5));
    const setMatches = game[1].matchAll(gameSetRegexp);

    for (const match of setMatches) {
      const color: 'blue' | 'green' | 'red' = match[2] as 'blue' | 'green' | 'red';
      const count = parseInt(match[1]);
      gameObj[color] = Math.max(gameObj[color] || 0, count) as number;
    }

    return gameObj;
  });

  return games as { id: number, blue: number, green: number, red: number }[];
}


function solve_part_one(input: string[], spec: any) {
  const parsedInput = parseInput(input || []);
  let validGameIds: number[] = [];

  parsedInput.forEach(game => {
    if (game['blue'] <= spec['blue'] &&
      game['green'] <= spec['green'] &&
      game['red'] <= spec['red']) {
      validGameIds.push(game.id);
    }
  });

  return validGameIds.reduce((prev, el) => prev + el, 0);
}

function solve(input: string[]) {
  const parsedInput = parseInput(input || []);
  let validGameIds: number[] = [];

  parsedInput.forEach(game => {
    validGameIds.push(game['blue'] * game['green'] * game['red']);
  });

  return validGameIds.reduce((prev, el) => prev + el, 0);
}

function loadInput() {
  const input = fs.readFileSync('./input.txt', 'utf8');
  const lines = input.split(/\r?\n/);
  return lines;
}

function run() {
  // const input = [
  //   'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  //   'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  //   'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  //   'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  //   'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
  // ];
  //

  const input = loadInput();
  const result_part_one = solve_part_one(input, { blue: 14, green: 13, red: 12, });
  const result = solve(input);

  console.log(result_part_one);
  console.log(result);
}

run();
