#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';
import path from 'path';
const gendiff = commander.program;

gendiff
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .name('gendiff')
  .usage('[options]')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'json')
  .arguments('<path1> <path2>')

  // eslint-disable-next-line no-undef
gendiff.parse(process.argv);
  // eslint-disable-next-line no-undef
const __workingDirectory = process.cwd();
const pathToFile1 = path.resolve(__workingDirectory, gendiff.args.shift());
const pathToFile2 = path.resolve(__workingDirectory, gendiff.args.shift());


console.log(pathToFile2)

console.log(gendiff.args);
console.log('Options: ', gendiff.opts());
console.log('Remaining arguments: ', gendiff.args);
