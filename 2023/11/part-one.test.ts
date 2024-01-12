import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve, { parseInput } from './part-one';

describe('--- Day 11: Cosmic Expansion ---', () => {

  test('Expands the universe correctly', () => {
    const sampleOne = [
      '...#......',
      '.......#..',
      '#.........',
      '..........',
      '......#...',
      '.#........',
      '.........#',
      '..........',
      '.......#..',
      '#...#.....',
    ]

    const expectedResult = [
      '....#........',
      '.........#...',
      '#............',
      '.............',
      '.............',
      '........#....',
      '.#...........',
      '............#',
      '.............',
      '.............',
      '.........#...',
      '#....#.......',
    ]

    expect(parseInput(sampleOne).galaxyMap.join('')).toEqual(expectedResult.join(''));
  });


  test('Computes the sum of the length of the shortest path between every pair of galaxies', () => {
    const sampleOne = [
      '...#......',
      '.......#..',
      '#.........',
      '..........',
      '......#...',
      '.#........',
      '.........#',
      '..........',
      '.......#..',
      '#...#.....',
    ]
    expect(solve(sampleOne)).toBe(374);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(9370588);
  });
});
