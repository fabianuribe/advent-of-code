// --- Day 1: Trebuchet?! ---
// https://adventofcode.com/2023/day/1

import * as fs from 'fs';

function findSpelledDigits(line: string): { digit: string, index: number }[] {
  const dict: {[key: string]: string} = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
  }

  let results: { digit: string, index: number }[] = [];

  Object.keys(dict).forEach(key => {
    let index = line.indexOf(key);
    while (index > -1) {
      results.push({ digit: dict[key], index: index });
      index = line.indexOf(key, index + 1)
    }
  });

  results.sort((a, b) => a.index - b.index);

  return results;
}

function getCalibrationValue(line: string): number {
  let first: string = '';
  let last: string = '';
  let i = -1;
  let j = line.length;

  const spelledDigits = findSpelledDigits(line);

  while (i <= j) {
    if (first && last) break;

    if (spelledDigits.length && spelledDigits[0].index <= i) {
      first = spelledDigits[0].digit;
    }

    if (!first) {
      i += 1;
      let charCode = line[i].charCodeAt(0);
      if (charCode >= 48 && charCode <= 57) {
        first = line[i];
      }
    }

    if (spelledDigits.length && spelledDigits[spelledDigits.length - 1].index >= j) {
      last = spelledDigits[spelledDigits.length - 1].digit;
    }

    if (!last) {
      j -= 1;
      let charCode = line[j].charCodeAt(0);
      if (charCode >= 48 && charCode <= 57) {
        last = line[j];
      }
    }
  }

  return parseInt(`${first}${last}`);
}


function solve(input: string[]): number {
  return input.reduce((acc, cur) => acc + getCalibrationValue(cur), 0);
}

function loadInput() {
  const input = fs.readFileSync('./input.txt', 'utf8');
  const lines = input.split(/\r?\n/);
  return lines;
}

function run() {
  const input = loadInput();
  const result = solve(input);
  console.log(result);
}

run();
