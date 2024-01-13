interface SpringRecord {
  springs: string[];
  record: number[];
  regex: RegExp;
}

function parseInput(input: string[]): SpringRecord[] {
  return input.filter(Boolean).map(line => {
    const parts = line.split(' ');
    const springs = parts[0].split('');
    const record = parts[1].split(',').map(Number);
    const regex = buildRegex(record);

    return {
      springs,
      record,
      regex,
    }
  });
}

function buildRegex(record: number[]) {
  let regexArr = ['^'];
  record.forEach((brokenCount, idx) => {
    return regexArr.push(`(\\.|\\?)*(\\.|\\?)${!idx ? '*' : ''}(#|\\?){${brokenCount}}`);
  });
  regexArr.push('(\\.|\\?)*$');
  return new RegExp(regexArr.join(''));
}

function findPermutations(sRec: SpringRecord): number {
  const springStr = sRec.springs.join('');
  const isMatch = sRec.regex.test(springStr);

  if (isMatch) {
    let nextSpring = sRec.springs.indexOf('?');
    if (nextSpring < 0) {
      // console.log(springStr);
      return 1;
    } else {
      let optA = [...sRec.springs];
      let optB = [...sRec.springs];

      optA.splice(nextSpring, 1, '#')
      optB.splice(nextSpring, 1, '.')

      return (
        findPermutations({ ...sRec, springs: optA }) +
        findPermutations({ ...sRec, springs: optB })
      );
    }
  } else {
    return 0;
  }
}


function solve(input: string[]) {
  const records = parseInput(input);
  return records.reduce((acc, rec) => {
    const perm = findPermutations(rec);
    // console.log(rec.springs.join(''), rec.regex, perm);
    return acc + perm;
  }, 0);
}

export default solve;
