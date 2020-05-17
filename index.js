#!/usr/bin/env node
import genDiff from './gendiff.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { program } = require('commander');

program
.version('1.0.0')
.description('Compares two configuration files and shows a difference.')
.arguments('<firstConfig> <secondConfig>')
.action((firstPathToFile, secondPathToFile) => {
	console.log(genDiff(firstPathToFile, secondPathToFile));
})
.option('-f, --format [type]', 'output format')
.parse(process.argv);