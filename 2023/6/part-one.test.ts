import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-one';

describe('--- Day 6: Wait For It ---', () => {
  test('Computes the lowest location to plant', () => {
    const sample = [
      'Time:      7  15   30',
      'Distance:  9  40  200'
    ];
    expect(solve(sample)).toBe(288);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(345015);
  });
});
