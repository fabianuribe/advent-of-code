class RangeNode {
  public start: number;
  public finish: number;
  public offset: number;
  public left: RangeNode | undefined;
  public right: RangeNode | undefined;

  constructor(start: number, finish: number, offset: number) {
    this.start = start;
    this.finish = finish;
    this.offset = offset;
  }

  add(node: RangeNode) {
    if (node.start >= this.finish) {
      if (this.right) {
        this.right.add(node)
      } else {
        this.right = node;
      }
    } else if (node.finish <= this.start) {
      if (this.left) {
        this.left.add(node)
      } else {
        this.left = node;
      }
    }
  }

  find(value: number): number {
    if (value >= this.start && value <= this.finish) {
      return this.offset;
    }

    if (value < this.start) {
      return this.left && this.left.find(value) || 0;
    }

    if (value > this.finish) {
      return this.right && this.right.find(value) || 0;
    }

    return 0;
  }
}

function extractMap(input: string[], sectionTitle: string) {
  let isInSection = false;
  let map: RangeNode | null = null;

  for (let i = 1; i < input.length; i += 1) {
    if (isInSection) {
      if (input[i]) {
        const parsed = input[i].split(/\s{1,}/).map(num => parseInt(num));
        const node = new RangeNode(parsed[1], parsed[1] + parsed[2] - 1, parsed[0] - parsed[1]);
        if (map) {
          map.add(node);
        } else {
          map = node;
        }
      } else {
        return map;
      }
    } else {
      if (input[i].indexOf(sectionTitle) >= 0) {
        isInSection = true;
      }
    }
  }
  return map;
}


function parseInput(input: string[]): { seeds: number[], maps: RangeNode[] } {
  let seeds = input[0].split(/\s{1,}/)?.slice(1)?.map(num => parseInt(num)) || [];

  let seedToSoil = extractMap(input, 'seed-to-soil');
  let soilToFertilizer = extractMap(input, 'soil-to-fertilizer');
  let fertilizerToWater = extractMap(input, 'fertilizer-to-water');
  let waterToLight = extractMap(input, 'water-to-light');
  let lightToTemperature = extractMap(input, 'light-to-temperature');
  let temperatureToHumidity = extractMap(input, 'temperature-to-humidity');
  let humidityToLocation = extractMap(input, 'humidity-to-location');

  let maps: RangeNode[] = [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation
  ].filter((m) => m !== null) as RangeNode[];

  return {
    seeds,
    maps
  };
}


function solve(input: string[]) {
  const { seeds, maps } = parseInput(input);
  const locations = seeds.map((seed) => {
    return maps.reduce((matched, currentMap) => {
      return matched + currentMap.find(matched);
    }, seed)
  });

  return Math.min(...locations);
}

export default solve;
