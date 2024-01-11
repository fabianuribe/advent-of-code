import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-one';

describe('--- Day X: ---', () => {
  test('----', () => {
    const sampleOne: string[] = [
    ];

    expect(solve(sampleOne)).toBe(6);
  });

  test.skip('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(18673);
  });
});
