#!/usr/bin/env node
import commander from 'commander';

const gendiff = commander.program;

gendiff
  .version('0.0.1', '-V, --version', 'output the version number');
gendiff
  .name('gendiff')
  .usage('[options]');
gendiff
  .helpOption('-h --help', 'output usage information');

// eslint-disable-next-line no-undef
gendiff.parse(process.argv);
