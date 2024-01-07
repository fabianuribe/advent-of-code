interface Card {
  card: number,
  scratch: string[],
  winning: Set<string>,
  wins: number
}

function parseInput(input: string[]): Card[] {
  const cards: Card[] = [];

  input.forEach((line, idx) => {
    const parts = line.split(/:|\|/);
    if (parts.length === 3) {
      const winning = new Set(parts[1].trim().split(/\s{1,}/));
      const scratch = parts[2].trim().split(/\s{1,}/);
      const wins = scratch.filter(num => winning.has(num)).length

      cards.push({
        card: idx,
        winning,
        scratch,
        wins
      });
    }
  });
  return cards;
}

function countCards(cards: Card[], cardIndex: number, memo: number[]): number {
  if (cardIndex >= cards.length) {
    return 0;
  }

  if (memo[cardIndex] !== undefined) {
    return memo[cardIndex];
  }

  const currentCard = cards[cardIndex];
  let total = 1; // Count the card itself

  for (let i = 0; i < currentCard.wins; i++) {
    total += countCards(cards, cardIndex + 1 + i, memo);
  }

  memo[cardIndex] = total;
  return total;
}

function solve(input: string[]) {
  const cards = parseInput(input);
  let memo = new Array(cards.length);
  let total = 0;

  for (let i = 0; i < cards.length; i++) {
    total += countCards(cards, i, memo);
  }
  return total;
}


export default solve;
