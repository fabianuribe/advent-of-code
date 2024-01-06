"use strict";
// --- Day 3: Gear Ratios ---
// https://adventofcode.com/2023/day/3
// --- Part Two ---
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
];
function isNumber(char) {
    return !!char && char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}
function findGears(schematic, y, x) {
    const gears = [];
    for (let d = 0; d < directions.length; d += 1) {
        // Check bounds
        const currentY = y + directions[d][1];
        const currentX = x + directions[d][0];
        if (currentY < 0 || currentY >= schematic.length ||
            currentX < 0 || currentX >= schematic[y].length) {
            continue;
        }
        if (schematic[currentY][currentX] === '*') {
            gears.push(`${currentY}:${currentX}`);
        }
    }
    return gears;
}
function buildGearMap(schematic) {
    let gearMap = {};
    let currentPart = 0;
    let currentGearIndices = new Set();
    for (let y = 0; y < schematic.length; y += 1) {
        for (let x = 0; x < schematic[y].length; x += 1) {
            if (isNumber(schematic[y][x])) {
                currentPart = (currentPart * 10) + parseInt(schematic[y][x]);
                findGears(schematic, y, x).forEach(idx => currentGearIndices.add(idx));
            }
            if (!isNumber(schematic[y][x]) || x == schematic[y].length - 1) {
                if (currentGearIndices.size > 0) {
                    Array.from(currentGearIndices).forEach(idx => {
                        gearMap[idx] = (gearMap[idx] || []).concat(currentPart);
                    });
                }
                currentPart = 0;
                currentGearIndices = new Set();
            }
        }
    }
    return gearMap;
}
function solve_part_two(schema) {
    const gearMap = buildGearMap(schema);
    let validGears = [];
    // Only Gears that have exaclty 2 parts are valid Gears
    Object.keys(gearMap).forEach((gear) => {
        if (gearMap[gear].length == 2) {
            validGears.push(gearMap[gear][0] * gearMap[gear][1]);
        }
    });
    return validGears.reduce((acc, cur) => acc + cur, 0);
}
function loadInput() {
    const input = fs.readFileSync('./input.txt', 'utf-8');
    const lines = input.split(/\n/);
    return lines;
}
function run() {
    const input = loadInput();
    const part_one_result = solve_part_two(input);
    console.log(part_one_result);
}
run();
// console.log(solve_part_two([
//   '467..114..',
//   '...*......',
//   '..35..633.',
//   '......#...',
//   '617*......',
//   '.....+.58.',
//   '..592.....',
//   '......755.',
//   '...$.*....',
//   '.664.598..',
// ]) == 467835);
//
// console.log(solve_part_two([
//   '1+.......2',
//   '+606.....-',
//   '3*.......(4',
// ]) == 1818);
//
// console.log(solve_part_two([
//   '1+........',
//   '..........',
//   '..........4',
// ]) == 0);
//
// console.log(solve_part_two([
//   '12.......*..',
//   '+.........34',
//   '.......-12..',
//   '..78........',
//   '..*....60...',
//   '78..........',
//   '.......23...',
//   '....90*12...',
//   '............',
//   '2.2......12.',
//   '.*.........*',
//   '1.1.......56',
// ]) == 6756 );
//
// console.log(solve_part_two([
//   '12.......*..',
//   '+.........34',
//   '.......-12..',
//   '..78........',
//   '..*....60...',
//   '78.........9',
//   '.5.....23..$',
//   '8...90*12...',
//   '............',
//   '2.2......12.',
//   '.*.........*',
//   '1.1..503+.56',
// ]) == 6756 );
