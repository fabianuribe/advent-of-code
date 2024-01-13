import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-one';

describe('--- Day 12: Hot Springs ---', () => {
  test('Computes all of the valid arrangements of operational and broken springs', () => {
    const sampleOne: string[] = [
      '?###???????? 3,2,1',
    ];

    const sampleTwo: string[] = [
      '???.### 1,1,3',
      '.??..??...?##. 1,1,3',
      '?#?#?#?#?#?#?#? 1,3,1,6',
      '????.#...#... 4,1,1',
      '????.######..#####. 1,6,5',
      '?###???????? 3,2,1',
    ];

    expect(solve(sampleOne)).toBe(10);
    expect(solve(sampleTwo)).toBe(21);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(6488);
  });
});
