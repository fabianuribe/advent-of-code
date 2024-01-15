import lcs from './part-one';

describe('Longest common subsequence', () => {
  test('----', () => {
    expect(lcs("ACBAD", "ABCD")).toBe(3);
    expect(lcs("AGCAT", "GAC")).toBe(2);
  });
});
