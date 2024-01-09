type CardName = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
interface HandObject {
  hand: string;
  bid: number;
  handRank: string;
}
let cardRemap: { [key in CardName]?: string } = {
  'A': 'E',
  'K': 'D',
  'Q': 'C',
  'J': '1',
  'T': 'A',
}

export function rankHand(hand: string): string {
  // This array stores the count of how many "types" of hands we have in the hand.
  // We use it to choose the highest possible strategy for the hand.
  // [Unseen count, high cards, 2 of a kind, 3 of a kind, 4 of a kind, 5 of a kind]
  let counts = [5, 0, 0, 0, 0, 0];

  let cardFrequency: { [key in CardName]?: number } = {};
  let rank;
  let remapedHand = hand.split('');

  for (let i = 0; i < hand.length; i += 1) {
    const card = hand[i] as CardName;
    const currentFrequency = cardFrequency[card] || 0;
    const newFrequency = currentFrequency + 1;
    cardFrequency[card] = newFrequency;
    counts[currentFrequency] -= 1;
    counts[newFrequency] += 1;
    remapedHand[i] = cardRemap[card] || card;
  };

  // Joker special case...
  if (cardFrequency['J'] || 0 > 0) {
    let highestCount = 0;
    let remappedCard = 'A'
    let cardKeys: CardName[] = Object.keys(cardFrequency) as CardName[];
    cardKeys.forEach((card) => {
      if (card !== 'J' && highestCount < (cardFrequency[card] || 0)) {
        highestCount = (cardFrequency[card] || 0);
        remappedCard = card;
      }
    });

    let newHand = hand.replace(/J/g, remappedCard);

    cardFrequency = {}
    counts = [5, 0, 0, 0, 0, 0];

    for (let i = 0; i < newHand.length; i += 1) {
      const card = newHand[i] as CardName;
      const currentFrequency = cardFrequency[card] || 0;
      const newFrequency = currentFrequency + 1;
      cardFrequency[card] = newFrequency;
      counts[currentFrequency] -= 1;
      counts[newFrequency] += 1;
    };
  }

  if (counts[5]) {
    rank = 'g';
  } else if (counts[4]) {
    rank = 'f';
  } else if (counts[3] && counts[2]) {
    rank = 'e';
  } else if (counts[3]) {
    rank = 'd';
  } else if (counts[2] == 2) {
    rank = 'c';
  } else if (counts[2]) {
    rank = 'b';
  } else {
    rank = 'a';
  }

  return `${rank}${remapedHand.join('')}`;
}

function parseInput(input: string[]): HandObject[] {
  return input.filter(line => !!line).map(line => {
    const parts = line.split(' ');
    const hand = parts[0];
    return {
      hand,
      bid: Number(parts[1]),
      handRank: rankHand(hand)
    }
  })
}

function handSort(a: HandObject, b: HandObject) {
  if (a.handRank > b.handRank) {
    return 1;
  } else if (a.handRank < b.handRank) {
    return -1;
  } else {
    return 0;
  }
}

function solve(input: string[]) {
  const hands: HandObject[] = parseInput(input).sort(handSort);
  let result = 0;

  for (let i = 0; i < hands.length; i += 1) {
    result += (hands[i].bid * (i + 1))
  }

  return result
}

export default solve;
