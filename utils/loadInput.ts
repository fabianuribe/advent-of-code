import * as fs from 'fs';

function loadInput(filePath: string): string[] {
  const input = fs.readFileSync(filePath, 'utf-8');
  const lines = input.split(/\n/);
  return lines;
}

export default loadInput;
