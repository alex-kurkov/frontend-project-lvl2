import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getDifference from '../src/index.js';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('comparing json files', async () => {
  const path1 = await getFixturePath('file1.json');
  const path2 = await getFixturePath('file2.json');
  const json = await readFile('expected_json.json');
  expect(getDifference(path1, path2)).toBeTruthy();
  expect(getDifference(path1, path2, 'json')).toEqual(json.trim());
  expect(getDifference(path1, path2, 'text')).not.toHaveLength(0);
  expect(getDifference(path1, path2)).toMatch(/\+ timeout/);
});
