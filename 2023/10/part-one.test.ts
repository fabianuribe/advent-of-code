import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-one';

describe('--- Day 10: Pipe Maze ---', () => {
  test('Count how many steps along the loop', () => {
    const sampleOne: string[] = [
      '.....',
      '.S-7.',
      '.|.|.',
      '.L-J.',
      '.....',
    ];
    const sampleTwo: string[] = [
      '..F7.',
      '.FJ|.',
      'SJ.L7',
      '|F--J',
      'LJ...',
    ];
    expect(solve(sampleOne)).toBe(4);
    expect(solve(sampleTwo)).toBe(8);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(7086);
  });
});
