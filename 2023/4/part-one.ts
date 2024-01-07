function parseInput(input: string[]): { card: number, winning: Set<string>, scratch: string[] }[] {
  const cards: { card: number, winning: Set<string>, scratch: string[] }[] = [];

  input.forEach((line, idx) => {
    const parts = line.split(/:|\|/);
    if (parts.length === 3) {
      cards.push({
        card: idx,
        winning: new Set(parts[1].trim().split(/\s{1,}/)),
        scratch: parts[2].trim().split(/\s{1,}/)
      });
    }
  });

  return cards;
}

function solve(input: string[]) {
  const cards = parseInput(input);
  const cardPoints = cards.map((card) => {
    return card.scratch.reduce((acc, num) => {
      if (card.winning.has(num)) {
        return ((acc * 2) || 1);
      }
      return acc;
    }, 0);
  });

  return cardPoints.reduce((acc, cur) => acc + cur, 0);
}

export default solve;
