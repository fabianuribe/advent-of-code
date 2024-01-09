import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-two';

describe('--- Day 8: Hunted Wasteland (Part Two) ---', () => {
  test('Counts how many steps are required to reach ZZZ', () => {
    const sampleTwo = [
      'LR',
      '',
      '11A = (11B, XXX)',
      '11B = (XXX, 11Z)',
      '11Z = (11B, XXX)',
      '22A = (22B, XXX)',
      '22B = (22C, 22C)',
      '22C = (22Z, 22Z)',
      '22Z = (22B, 22B)',
      'XXX = (XXX, XXX)',
    ]

    expect(solve(sampleTwo)).toBe(6);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(17972669116327);
  });
});
