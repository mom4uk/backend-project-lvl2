#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';

const normalizesOutputInStr = (coll) => {
  const iter = (items, acc) => {
    const [item] = items;
    if (items.length === 0) {
      return `${acc}\n${'}'}`;
    }
    return iter(items.splice(1, items.length - 1), `${acc}\n ${item}`);
  };
  return iter(coll, '{');
};

const getDiffObj = (firstObj, secondObj) => {
  const result = [];
  for (const key in firstObj) {
    if (Object.prototype.hasOwnProperty.call(firstObj, key)) {
      for (const sKey in secondObj) {
        if (Object.prototype.hasOwnProperty.call(secondObj, sKey)) {
          if (key === sKey && firstObj[key] === secondObj[key]) {
            result.push(`${key}: ${firstObj[key]}`);
          }
          if (key === sKey && firstObj[key] !== secondObj[key]) {
            result.push(`+ ${sKey}: ${secondObj[sKey]}`);
            result.push(`- ${key}: ${firstObj[key]}`);
          }
          if (!Object.prototype.hasOwnProperty.call(secondObj, key) && !result.includes(`- ${key}: ${firstObj[key]}`)) {
            result.push(`- ${key}: ${firstObj[key]}`);
          }
          if (!Object.prototype.hasOwnProperty.call(firstObj, sKey) && !result.includes(`+ ${sKey}: ${secondObj[sKey]}`)) {
            result.push(`+ ${sKey}: ${secondObj[sKey]}`);
          }
        }
      }
    }
  }
  return normalizesOutputInStr(result);
};


const genDiff = (firstPathToFile, secondPathToFile) => {
  const fp = path.resolve(firstPathToFile);
  const sp = path.resolve(secondPathToFile);
  const firstDataAsString = fs.readFileSync(fp, 'utf8');
  const secondDataAsString = fs.readFileSync(sp, 'utf8');
  if (path.extname(firstPathToFile) === '.yaml' && path.extname(secondPathToFile) === '.yaml') {
    const dataAsObj = parsStrYamlToObj(firstDataAsString);
    const data2AsObj = parsStrYamlToObj(secondDataAsString);
    return getDiffObj(dataAsObj, data2AsObj);
  }
  if (path.extname(firstPathToFile) === '.ini' && path.extname(secondPathToFile) === '.ini') {
    const dataAsObj = parsStrIniToObj(firstDataAsString);
    const data2AsObj = parsStrIniToObj(secondDataAsString);
    return getDiffObj(dataAsObj, data2AsObj);
  }
  const dataAsObj = JSON.parse(firstDataAsString);
  const data2AsObj = JSON.parse(secondDataAsString);
  return getDiffObj(dataAsObj, data2AsObj);
};

export default genDiff;
