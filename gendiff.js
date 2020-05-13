#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { program } = require('commander');

const normalizesOutputInStr = (coll) => {
	const iter = (coll, acc) => {
		const [item] = coll;
		if (coll.length === 0) {
			return acc + `\n${'}'}`;
		}
		return iter(coll.splice(1, coll.length - 1), acc + `\n ${item}`);
	}
	return iter(coll,'{');
}

const getDiffObj = (firstObj, secondObj) => {
	const result = [];
	for (const key in firstObj) {
		for (const sKey in secondObj) {
			if (key === sKey && firstObj[key] === secondObj[key]) {
				result.push(`${key}: ${firstObj[key]}`);
			}
			if (key === sKey && firstObj[key] !== secondObj[key]) {
				result.push(`+ ${sKey}: ${secondObj[sKey]}`);
				result.push(`- ${key}: ${firstObj[key]}`);
			}
			if (!secondObj.hasOwnProperty(key) && !result.includes(`- ${key}: ${firstObj[key]}`)) {
				result.push(`- ${key}: ${firstObj[key]}`);
			}
			if (!firstObj.hasOwnProperty(sKey) && !result.includes(`+ ${sKey}: ${secondObj[sKey]}`)) {
				result.push(`+ ${sKey}: ${secondObj[sKey]}`);
			}
		}
	}
	return normalizesOutputInStr(result);
};


const genDiff = (firstPathToFile, secondPathToFile) => {
	const path = require('path');
	const fs = require('fs');
	const fp = path.resolve(firstPathToFile);
	const sp = path.resolve(secondPathToFile);
  const data = fs.readFileSync(fp);
  const data2 = fs.readFileSync(sp);
  const parseDataInStr = String.fromCharCode.apply(String, data);
  const parseData2InStr = String.fromCharCode.apply(String, data2);
  const dataAsObj = JSON.parse(parseDataInStr);
  const data2AsObj = JSON.parse(parseData2InStr);
  console.log(getDiffObj(dataAsObj, data2AsObj));
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

export default genDiff;