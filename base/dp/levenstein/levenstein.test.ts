import levenstein from './levenstein';

describe('Levenstein', () => {
  test('----', () => {
    // expect(levenstein("", "puppy")).toBe(5);
    expect(levenstein("puppy", "puppy")).toBe(0);
    expect(levenstein("kitten", "sitting")).toBe(3);
    expect(levenstein("uninformed", "uniformed")).toBe(1);
    expect(levenstein("pneumonoultramicroscopicsilicovolcanoconiosis", "sisoinoconaclovociliscipocsorcimartluonomuenp")).toBe(36);

  });
});
