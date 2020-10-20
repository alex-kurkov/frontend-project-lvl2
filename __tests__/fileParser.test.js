import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fileParser from '../src/fileParser.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('path reading test', async () => {
  const path = await getFixturePath('file2.json');
  expect(fileParser(path)).toBeTruthy();
  expect(fileParser()).toBeFalsy();
});

test('file parsing test', async () => {
  const path = await getFixturePath('file1.json');
  expect(fileParser(path)).toHaveProperty("proxy", "123.234.53.22");
});
