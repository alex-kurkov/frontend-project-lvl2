import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import getDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('comparing floor json files', async () => {
  const path1 = await getFixturePath('file1.json');
  const path2 = await getFixturePath('file2.json');
  const json = await readFile('expected_json.json');
  expect(getDifference(path1, path2)).toBeTruthy();
  expect(getDifference(path1, path2, 'json')).toEqual(json.trim());
  expect(getDifference(path1, path2, 'plain')).not.toHaveLength(0);
  expect(getDifference(path1, path2)).toMatch(/\+ timeout/);
});

test('comparing floor yaml files', async () => {
  const path1 = await getFixturePath('example1.yaml');
  const path2 = await getFixturePath('example2.yml');
  const json = await readFile('expected_json.json');
  expect(getDifference(path1, path2, 'json')).toEqual(json.trim());
  expect(getDifference(path1, path2)).not.toHaveLength(0);
  expect(getDifference(path1, path2)).toMatch(/- follow/);
});

test('comparing files with nested data', async () => {
  const path1 = await getFixturePath('nestedfile1.json');
  const path2 = await getFixturePath('nestedfile2.json');
  const result = await readFile('stylishnestedresult');
  expect(getDifference(path1, path2)).toEqual(result.trim());
  expect(getDifference(path1, path2)).not.toHaveLength(0);
  expect(getDifference(path1, path2)).toMatch(/\+ setting4: blah blah/);
});

test('checking plain render', async () => {
  const path1 = await getFixturePath('nestedfile1.json');
  const path2 = await getFixturePath('nestedfile2.json');
  const result = await readFile('plainrender');
  expect(getDifference(path1, path2, 'plain')).toEqual(result.trim());
});
