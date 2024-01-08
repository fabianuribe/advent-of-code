import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-two';

describe('--- Day 6: Wait For It (Part Two) ---', () => {
  test('Computes the lowest location to plant', () => {
    const sample = [
      'Time:      7  15   30',
      'Distance:  9  40  200'
    ];
    expect(solve(sample)).toBe(71503);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(42588603);
  });
});
