#!/usr/bin/env node

/*eslint no-undef: "error"*/
/*eslint-env node*/

import commander from 'commander';
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


gendiff.parse(process.argv);

const __workingDirectory = process.cwd();
const absolutePaths = gendiff.args.map((arg) => path.resolve(__workingDirectory, path.normalize(arg)));

const format = gendiff.format || 'text';

const diff = getDifference(absolutePaths[0], absolutePaths[1], format);
console.log(diff);

export default getDifference;
