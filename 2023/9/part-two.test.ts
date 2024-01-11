import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-two';

describe('--- Day 9: Mirage Maintenance (Part Two) ---', () => {
  test('Compute the sum of these extrapolated values', () => {
    const sampleOne: string[] = [
      '0 3 6 9 12 15',
      '1 3 6 10 15 21',
      '10 13 16 21 30 45',
    ];

    expect(solve(sampleOne)).toBe(2);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(1757008019);
  });
});
