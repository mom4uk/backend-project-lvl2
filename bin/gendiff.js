#!/usr/bin/env node

const { program } = require('commander');

program
.version('1.0.0')
.description('Compares two configuration files and shows a difference.')
.arguments('<firstConfig> <secondConfig>')
.action(genDiff = (firstPathToFile, secondPathToFile) => {
	const path = require('path')
	const fp = path.resolve(firstPathToFile);
	const sp = path.resolve(secondPathToFile);
	const fs = require('fs')
  const data = fs.readFileSync(fp);
  const data2 = fs.readFileSync(sp);
  const parseDataInStr = String.fromCharCode.apply(String, data);
  const parseData2InStr = String.fromCharCode.apply(String, data2);
  const dataAsObject = JSON.parse(parseDataInStr);
  const data2AsObject = JSON.parse(parseData2InStr);
})
.option('-f, --format [type]', 'output format')
.parse(process.argv);