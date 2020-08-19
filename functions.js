import isEqual from 'lodash/isEqual.js';
import isArray from 'lodash/isarray.js';
import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';


const stylish = (coll) => {
  let result = '';
  for (const item of coll) {
    if (item.length === 2) {
      const [key, value] = item;
      if (isArray(item) && isArray(value)) {
        result += `${key}: {\n${stylish(value)}\n  }`;
      }
      if (typeof(value) === 'object') {
        console.log('1');
      }
      if (!isArray(value)) {
        result += `    ${key}: ${value}\n`;
      }
    }
    else if (item.length === 3) {
      const [sign, key, value] = item;
      console.log(item)
      if (isArray(value)) {
        console.log('sddddddddddd')
        result += `\n${sign} ${key}: {\n  ${value}}`;
      }
      if (typeof(value) === 'object') {
      }
      result += `  ${sign} ${key}: ${value}\n`;
    }
  }
  return result;
};

const isCollHasPair = (coll, pair) => {
  for (const innerPair of coll) {
    if (isEqual(innerPair, pair)) {
      return true;
    }
  }
  return false;
};

const isCollHasKey = (coll, key) => {
  for (const row of coll) {
    if (row.includes(key)) {
      return true;
    }
  }
  return false;
};

const isBothValuesObj = (value, value2) => {
  if (typeof(value) === 'object' && typeof(value2) === 'object') {
    return true;
  }
  return false;
};

const getDiffObj = (con1, con2) => {
  const diff = (content1, content2) => {
  const x = Object.entries(content1);
  const y = Object.entries(content2);
  const resultInner = x.reduce((acc, pair1) => {
    const [key,value] = pair1;
    for (const [key2, value2] of y) {
      if (key === key2 && isBothValuesObj(value, value2)) {
        acc.push([key2, diff(value, value2)]);
      }
      const minusPair1 = ['-', key, value];
      const plusPair2 = ['+', key2, value2];
      if (key === key2 && value === value2) {
        acc.push(pair1);
      }
      if (key === key2 && value !== value2 && !isBothValuesObj(value, value2)) {
        acc.push(plusPair2);
        acc.push(minusPair1);
      }
      if (!isCollHasKey(y, key) && !isCollHasPair(acc, minusPair1)) {
        acc.push(minusPair1);
      }
      if (!isCollHasKey(x, key2) && !isCollHasPair(acc, plusPair2)) {
        acc.push(plusPair2);
      }
    }
    return acc;
  }, []);
  return resultInner;
}
const result = diff(con1, con2);
  return stylish(result);
}
const genDiff = (collOfReadedFiles, format) => {
  const [data1, data2] = collOfReadedFiles;
  switch (format) {
    case 'yaml':
      return getDiffObj(parsStrYamlToObj(data1), parsStrYamlToObj(data2));
    case 'ini':
      return getDiffObj(parsStrIniToObj(data1), parsStrIniToObj(data2));
    default:
      return getDiffObj(JSON.parse(data1), JSON.parse(data2));
  }
};

export default genDiff;
