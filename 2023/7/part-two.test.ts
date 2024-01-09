import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-two';

describe('--- Day 7: Camel Cards (Part Two) ---', () => {
  test('Computes the total winnings of this set of hands', () => {
    const sample = [
      '32T3K 765',
      'T55J5 684',
      'KK677 28',
      'KTJJT 220',
      'QQQJA 483',
    ];
    expect(solve(sample)).toBe(5905);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(246894760);
    // 249496666 too high
  });


});
