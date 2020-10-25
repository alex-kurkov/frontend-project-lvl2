import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fileParser from '../src/fileParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('path reading test', async () => {
  const filePath = await getFixturePath('file2.json');
  expect(fileParser(filePath)).toBeTruthy();
  expect(fileParser()).toBeFalsy();
});

test('file parsing test', async () => {
  const filePath1 = await getFixturePath('file1.json');
  const filePath2 = await getFixturePath('example2.yml');
  expect(fileParser(filePath1)).toHaveProperty('proxy', '123.234.53.22');
  expect(fileParser(filePath2)).toHaveProperty('timeout', 20);
});
