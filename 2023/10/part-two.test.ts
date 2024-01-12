import * as path from 'path';
import loadInput from '../../utils/loadInput';
import solve from './part-two';


describe('--- Day X: YYYY (Part Two) ---', () => {
  test('----', () => {

    const sampleZero = [
      '.S--7.',
      '.|..|.',
      '.|..|.',
      '.L--J.',
      '......',
    ];


    const sampleOne: string[] = [
      '...........',
      '.S-------7.',
      '.|F-----7|.',
      '.||.....||.',
      '.||.....||.',
      '.|L-7.F-J|.',
      '.|..|.|..|.',
      '.L--J.L--J.',
      '...........',
    ];

    const sampleTwo: string[] = [
      '..........',
      '.S------7.',
      '.|F----7|.',
      '.||OOOO||.',
      '.||OOOO||.',
      '.|L-7F-J|.',
      '.|II||II|.',
      '.L--JL--J.',
      '..........',
    ];

    const sampleThree: string[] = [
      'OF----7F7F7F7F-7OOOO',
      'O|F--7||||||||FJOOOO',
      'O||OFJ||||||||L7OOOO',
      'FJL7L7LJLJ||LJIL-7OO',
      'L--JOL7IIILJS7F-7L7O',
      'OOOOF-JIIF7FJ|L7L7L7',
      'OOOOL7IF7||L7|IL7L7|',
      'OOOOO|FJLJ|FJ|F7|OLJ',
      'OOOOFJL-7O||O||||OOO',
      'OOOOL---JOLJOLJLJOOO',
    ];

    const sampleFour: string[] = [
      'FF7FSF7F7F7F7F7F---7',
      'L|LJ||||||||||||F--J',
      'FL-7LJLJ||||||LJL-77',
      'F--JF--7||LJLJIF7FJ-',
      'L---JF-JLJIIIIFJLJJ7',
      '|F|F-JF---7IIIL7L|7|',
      '|FFJF7L7F-JF7IIL---7',
      '7-L-JL7||F7|L7F-7F7|',
      'L.L7LFJ|||||FJL7||LJ',
      'L7JLJL-JLJLJL--JLJ.L',
    ]

    expect(solve(sampleZero)).toBe(4);
    expect(solve(sampleOne)).toBe(4);
    expect(solve(sampleTwo)).toBe(4);
    expect(solve(sampleThree)).toBe(8);
    expect(solve(sampleFour)).toBe(10);
  });

  test('Puzzle Input', () => {
    const input = loadInput(path.join(__dirname, './input.txt'));
    expect(solve(input)).toBe(317);
  });
});
