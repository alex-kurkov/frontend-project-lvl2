import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import getDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each([
  ['before1.json', 'before2.json', 'after.json', 'json', /\+ timeout/],
  ['before1.yaml', 'before2.yaml', 'after.json', 'json', /- follow/],
  ['before-nested1.json', 'before-nested2.json', 'after-stylish', 'stylish', /\+ setting4: blah blah/],
  ['before-nested1.json', 'before-nested2.json', 'after-plain', 'plain',
    /Property 'common\.setting6\.doge\.wow' was updated\. From '' to 'so much'/],
  ['before-nested1.json', 'before-nested2.json', 'after-nested.json', 'json',
    /"- group2":{"abc":12345,"deep":{"id":45}}/],
])('check %s compared to %s', (file1, file2, resultFile, output, pattern) => {
  test(`results in ${resultFile} formatted in mode: ${output}`, async () => {
    const path1 = await getFixturePath(file1);
    const path2 = await getFixturePath(file2);
    const result = await readFile(resultFile).trim();
    expect(getDifference(path1, path2, output)).toEqual(result);
    expect(getDifference(path1, path2, output)).not.toHaveLength(0);
    expect(getDifference(path1, path2, output)).toMatch(pattern);
  });
});
