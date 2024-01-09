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

function solve(input: string[]) {
  const { instructions, escapeMap } = parseInput(input);
  let count = 0;
  let currentIndex = -1;
  let currentNode = escapeMap['AAA'];
  
  while (currentNode.label !== 'ZZZ') {
    currentIndex = instructions.length - 1 > currentIndex ? currentIndex + 1 : 0;
    currentNode = currentNode.get(instructions[currentIndex]) as MapNode;
    count += 1;
  }

  return count;
}



export default solve;
