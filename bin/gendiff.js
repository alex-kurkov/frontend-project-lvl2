#!/usr/bin/env node
import commander from 'commander';
import path from 'path';
const gendiff = commander.program;

gendiff
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .name('gendiff')
  .usage('[options]')
  .helpOption('-h, --help', 'output usage information')
 
gendiff
  .option('-f, --format [type]', 'output format', 'json')

gendiff
  .arguments('<pathToFile1> <pathToFile1>')

const file1 = path.resolve('${gendiff.pathToFile1}')
console.log(file1);

// eslint-disable-next-line no-undef
gendiff.parse(process.argv);

console.log('Options: ', gendiff.opts());
console.log('Remaining arguments: ', gendiff.args);
