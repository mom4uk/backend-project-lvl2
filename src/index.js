#!/usr/bin/env node
import { createRequire } from 'module';
import { getFileContent, getFileFormats } from './utils.js';
import genDiff from './gendiff.js';

const require = createRequire(import.meta.url);
const { program } = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((firstPathToFile, secondPathToFile) => {
    const fileContent = getFileContent(firstPathToFile, secondPathToFile);
    const fileFormats = getFileFormats(firstPathToFile, secondPathToFile);
    console.log(genDiff(fileContent, fileFormats, program.format));
  });
program.parse(process.argv);
