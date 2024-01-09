import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-one';

describe('--- Day 8: Hunted Wasteland ---', () => {
  test('Counts how many steps are required to reach ZZZ', () => {
    const sampleOne = [
      'RL',
      '',
      'AAA = (BBB, CCC)',
      'BBB = (DDD, EEE)',
      'CCC = (ZZZ, GGG)',
      'DDD = (DDD, DDD)',
      'EEE = (EEE, EEE)',
      'GGG = (GGG, GGG)',
      'ZZZ = (ZZZ, ZZZ)',
    ];

    const sampleTwo = [
      'LLR',
      '',
      'AAA = (BBB, BBB)',
      'BBB = (AAA, ZZZ)',
      'ZZZ = (ZZZ, ZZZ)',
    ]

    expect(solve(sampleOne)).toBe(2);
    expect(solve(sampleTwo)).toBe(6);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(18673);
  });
});
