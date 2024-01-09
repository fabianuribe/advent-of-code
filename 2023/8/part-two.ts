class MapNode {
  [key: string]: any;

  public label: string
  public L: MapNode | null;
  public R: MapNode | null;

  constructor(label: string) {
    this.label = label;
    this.L = null;
    this.R = null;
  }

  public get(property: string) {
    return this[property] || null;
  }
}

function parseInput(input: string[]) {
  const instructions = input[0].split('');
  const escapeMap: { [key: string]: MapNode } = {};

  for (var i = 2; i < input.length; i += 1) {
    const label = input[i].slice(0, 3);
    escapeMap[label] = new MapNode(label);
  }

  for (var i = 2; i < input.length; i += 1) {
    const label = input[i].slice(0, 3);
    const children = input[i].match(/\w{3}/g) || [];

    const mapNode = escapeMap[label];
    if (children[1]) {
      mapNode.L = escapeMap[children[1]];
    }
    if (children[2]) {
      mapNode.R = escapeMap[children[2]];
    }
  }

  return {
    instructions,
    escapeMap
  }
}

function walk(currentNode: MapNode, instructions: string[]) {
  let count = 0;
  let currentIndex = -1;

  while (currentNode.label[2] !== 'Z') {
    currentIndex = instructions.length - 1 > currentIndex ? currentIndex + 1 : 0;
    currentNode = currentNode.get(instructions[currentIndex]) as MapNode;
    count += 1;
  }

  return count;
}

function gcd(a: number, b: number) {
  while (b != 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}

function lcmOfArray(arr: number[]) {
  let currentLcm = arr[0];
  for (let i = 1; i < arr.length; i++) {
    currentLcm = lcm(currentLcm, arr[i]);
  }
  return currentLcm;
}

function solve(input: string[]) {
  const { instructions, escapeMap } = parseInput(input);

  let startingNodes = Object.keys(escapeMap).filter(label => label[2] === 'A').map(label => escapeMap[label]);
  let stepCounts = startingNodes.map(node => walk(node, instructions));

  return lcmOfArray(stepCounts);
}



export default solve;
