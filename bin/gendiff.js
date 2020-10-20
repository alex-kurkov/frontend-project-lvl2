#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';
import path from 'path';
import getDifference from '../src/index.js';
const gendiff = commander.program;

gendiff
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .name('gendiff')
  .usage('[options]')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'text')
  .arguments('<path1> <path2>')

  // eslint-disable-next-line no-undef
gendiff.parse(process.argv);
  // eslint-disable-next-line no-undef
const __workingDirectory = process.cwd();
const parcedObjects = gendiff.args
  .map((arg) => path.resolve(__workingDirectory, path.normalize(arg)))
  .map((path) => fs.readFileSync(path))
  .map((file) => JSON.parse(file))

const object1 = parcedObjects[0];
const object2 = parcedObjects[1];
const format = gendiff.format || 'text';
/* console.log(object1);
console.log(object2); */
const diff = getDifference(object1, object2, format);
console.log(diff);

export default diff;
