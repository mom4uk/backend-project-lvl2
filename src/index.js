#!/usr/bin/env node
import { createRequire } from 'module';
import { getFileContents, getFileFormat } from './utils.js';
import genDiff from './gendiff.js';

const require = createRequire(import.meta.url);
const { program } = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((firstPathToFile, secondPathToFile) => {
    const fileContent = getFileContents(firstPathToFile, secondPathToFile);
    const fileFormats = getFileFormat(firstPathToFile, secondPathToFile);
    console.log(genDiff(fileContent, fileFormats, program.format));
  });
program.parse(process.argv);
