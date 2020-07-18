#!/usr/bin/env node
import { createRequire } from 'module';
import genDiff from './functions.js';
import { getReadedFiles, getFilesFormat } from './secondary-functions.js';

const require = createRequire(import.meta.url);
const { program } = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstPathToFile, secondPathToFile) => {
    const readedFiles = getReadedFiles(firstPathToFile, secondPathToFile);
    const formatsFiles = getFilesFormat(firstPathToFile, secondPathToFile);
    console.log(genDiff(readedFiles, formatsFiles));
  })
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
