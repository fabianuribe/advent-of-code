import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-two';


describe('--- Day 11: Cosmic Expansion (Part Two) ---', () => {

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
    expect(solve(10, sampleOne)).toBe(1030);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(1000000, input)).toBe(746207878188);
  });
});
