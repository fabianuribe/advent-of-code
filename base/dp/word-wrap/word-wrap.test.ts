import wordWrap from "./word-wrap";

describe('word wrap', () => {
  test('Minimizes the sum of the squares of the lengths of the spaces at the end of lines', () => {
    let s1 = 'AAA BB CC DDDDD';
    let t1 = 6;
    let s2 = 'AAAAAA BBB CCCCC DD EEEE';
    let t2 = 10;
    expect(wordWrap(s1, t1)).toEqual([['AAA'], ['BB', 'CC'], ['DDDDD']]);
    expect(wordWrap(s2, t2)).toEqual([['AAAAAA'], ['BBB', 'CCCCC'], ['DD', 'EEEE']]);
  });
});
