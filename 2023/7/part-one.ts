type CardName = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
interface HandObject {
  hand: string;
  bid: number;
  handRank: string;
}

export function rankHand(hand: string): string {
  let cardCount: { [key in CardName]: number } = {
    'A': 0,
    'K': 0,
    'Q': 0,
    'J': 0,
    'T': 0,
    '9': 0,
    '8': 0,
    '7': 0,
    '6': 0,
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
  }
  let cardRemap: { [key in CardName]?: string } = {
    'A': 'E',
    'K': 'D',
    'Q': 'C',
    'J': 'B',
    'T': 'A',
  }
  let counts = [5, 0, 0, 0, 0, 0];
  let rank;
  let remapedHand = hand.split('');

  for (let i = 0; i < hand.length; i += 1) {
    const card = hand[i] as CardName;
    const currentCount = cardCount[card];
    const newCount = currentCount + 1;
    cardCount[card] = newCount;
    counts[currentCount] -= 1;
    counts[newCount] += 1;
    remapedHand[i] = cardRemap[card] || card;
  };

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
