"use strict";
// --- Day 1: Trebuchet?! ---
// https://adventofcode.com/2023/day/1
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
function findSpelledDigits(line) {
    const dict = {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
    };
    let results = [];
    Object.keys(dict).forEach(key => {
        let index = line.indexOf(key);
        while (index > -1) {
            results.push({ digit: dict[key], index: index });
            index = line.indexOf(key, index + 1);
        }
    });
    results.sort((a, b) => a.index - b.index);
    return results;
}
function getCalibrationValue(line) {
    let first = '';
    let last = '';
    let i = -1;
    let j = line.length;
    const spelledDigits = findSpelledDigits(line);
    while (i <= j) {
        if (first && last)
            break;
        if (spelledDigits.length && spelledDigits[0].index <= i) {
            first = spelledDigits[0].digit;
        }
        if (!first) {
            i += 1;
            let charCode = line[i].charCodeAt(0);
            if (charCode >= 48 && charCode <= 57) {
                first = line[i];
            }
        }
        if (spelledDigits.length && spelledDigits[spelledDigits.length - 1].index >= j) {
            last = spelledDigits[spelledDigits.length - 1].digit;
        }
        if (!last) {
            j -= 1;
            let charCode = line[j].charCodeAt(0);
            if (charCode >= 48 && charCode <= 57) {
                last = line[j];
            }
        }
    }
    return parseInt(`${first}${last}`);
}
function solve(input) {
    return input.reduce((acc, cur) => acc + getCalibrationValue(cur), 0);
}
function loadInput() {
    const input = fs.readFileSync('./input.txt', 'utf8');
    const lines = input.split(/\r?\n/);
    return lines;
}
function run() {
    const input = loadInput();
    const result = solve(input);
    console.log(result);
}
run();
