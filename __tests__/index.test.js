import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import getDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedFlatJson = readFile('result.json', 'utf-8');
const expectedNestedJson = readFile('resultnested.json', 'utf-8');
const expectedStylish = readFile('resultstylish', 'utf-8');
const expectedPlain = readFile('resultplain', 'utf-8');

test.each`
file1                      |file2                   |expected              |mode
${'file1.json'}            |${'file2.json'}         |${expectedFlatJson}   |${'json'}
${'file1.yaml'}            |${'file2.yaml'}         |${expectedFlatJson}   |${'json'}
${'nestedfile1.json'}      |${'nestedfile2.json'}   |${expectedStylish}    |${'stylish'}
${'nestedfile1.json'}      |${'nestedfile2.json'}   |${expectedPlain}      |${'plain'}
${'nestedfile1.json'}      |${'nestedfile2.json'}   |${expectedNestedJson} |${'json'}
`('check $file1 compared to $file2 formatted in mode: $mode results in $expected',
  ({
    file1, file2, expected, mode,
  }) => {
    const path1 = getFixturePath(file1);
    const path2 = getFixturePath(file2);
    expect(getDifference(path1, path2, mode)).toEqual(expected);
  });
