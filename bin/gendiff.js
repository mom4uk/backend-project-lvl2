#!/usr/bin/env node

const { program } = require('commander');

const getDiffObj = (firstObj, secondObj) => {
	const result = [];
	for (const key in firstObj) {
		for (const sKey in secondObj) {
			if (key === sKey && firstObj[key] === secondObj[key]) {
				result.push(`\n ${key}: ${firstObj[key]}`);
			}
			if (key === sKey && firstObj[key] !== secondObj[key]) {
				result.push(`\n + ${sKey}: ${secondObj[sKey]}`);
				result.push(`\n - ${key}: ${firstObj[key]}`);
			}
			if (!secondObj.hasOwnProperty(key) && !result.includes(`\n - ${key}: ${firstObj[key]}`)) {
				result.push(`\n - ${key}: ${firstObj[key]}`);
			}
			if (!firstObj.hasOwnProperty(sKey) && !result.includes(`\n + ${sKey}: ${secondObj[sKey]}`)) {
				result.push(`\n + ${sKey}: ${secondObj[sKey]}`);
			}
		}
	}
	console.log(String(result))
};

const genDiff = (firstPathToFile, secondPathToFile) => {
	const path = require('path');
	const fp = path.resolve(firstPathToFile);
	const sp = path.resolve(secondPathToFile);
	const fs = require('fs');
  const data = fs.readFileSync(fp);
  const data2 = fs.readFileSync(sp);
  const parseDataInStr = String.fromCharCode.apply(String, data);
  const parseData2InStr = String.fromCharCode.apply(String, data2);
  const dataAsObj = JSON.parse(parseDataInStr);
  const data2AsObj = JSON.parse(parseData2InStr);
  getDiffObj(dataAsObj, data2AsObj);
};

program
.version('1.0.0')
.description('Compares two configuration files and shows a difference.')
.arguments('<firstConfig> <secondConfig>')
.action((firstPathToFile, secondPathToFile) => {
	genDiff(firstPathToFile, secondPathToFile);
})
.option('-f, --format [type]', 'output format')
.parse(process.argv);