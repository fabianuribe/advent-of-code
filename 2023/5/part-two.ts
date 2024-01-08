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


function parseInput(input: string[]): { seedRanges: number[], maps: RangeNode[] } {
  let seedRanges = input[0].split(/\s{1,}/)?.slice(1)?.map(num => parseInt(num)) || [];

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
    seedRanges,
    maps
  };
}


function solve(input: string[]) {
  const { seedRanges, maps } = parseInput(input);

  let minLocation = Infinity;
  let minSeedRange = 0;

  // Make large jumps through all the ranges to find the range with min location
  for (let i = 0; i < seedRanges.length; i += 2) {
    for (let j = seedRanges[i]; j <= seedRanges[i] + seedRanges[i + 1]; j += 1000) {
      const loc = maps.reduce((matched, currentMap) => {
        return matched + currentMap.find(matched);
      }, j);

      if (loc < minLocation) {
        minSeedRange = i;
        minLocation = loc;
      }
    }
  }

  // Go through the min range one by one to find the min location
  for (let j = seedRanges[minSeedRange]; j <= seedRanges[minSeedRange] + seedRanges[minSeedRange + 1]; j += 1) {
    const loc = maps.reduce((matched, currentMap) => {
      return matched + currentMap.find(matched);
    }, j);

    if (loc < minLocation) {
      minLocation = loc;
    }
  }

  return minLocation;
}

export default solve;
