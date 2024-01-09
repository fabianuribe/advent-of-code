import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-one';

describe( '--- Day 7: Camel Cards', () => {
  test('Computes the total winnings of this set of hands', () => {
    const sample = [
      '32T3K 765',
      'T55J5 684',
      'KK677 28',
      'KTJJT 220',
      'QQQJA 483',
    ];
    expect(solve(sample)).toBe(6440);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(246912307);
  });


});
