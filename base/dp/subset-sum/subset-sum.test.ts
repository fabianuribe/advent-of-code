import subsetSum from './subset-sum';

describe('Subset Sum', () => {
  test('Computes whether any subset of the integers S sum to precisely T', () => {
    expect(subsetSum([7, 3, 2, 9000, 5, 8], 17)).toEqual([ 5, 2, 3, 7 ]);
    expect(subsetSum([7, 3, 2, 9000, 5, 8], 6)).toEqual([]);
  });
});
