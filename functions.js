import isEqual from 'lodash/isEqual.js';
import isArray from 'lodash/isarray.js';
import isObject from 'lodash/isObject.js';
import includes from 'lodash/includes.js';
import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';

const stylish = (coll) => {
  const result = [];
  let counter = 1;
  for (const item of coll) {
    if (item.type === 'added') {
      result.push(`+ ${item.key}: ${item.value}\n`);
    }
    if (item.type === 'removed') {
      result.push(`- ${item.key}: ${item.value}\n`);
    }
    if (item.type === 'changed') {
      result.push(`+ ${item.key}: ${item.newValue}\n`);
      result.push(`- ${item.key}: ${item.oldValue}\n`);
    }
    if (item.type === 'unchanged') {
      result.push(`${item.key}: ${item.value}\n`);
    }
    if (item.type === 'parent') {
      counter += 1;
      result.push(`${item.key}: {\n${stylish(item.children)}}\n`);
    }
  }
  return result.join('');
};

// const stylish = (coll) => {
// return coll.reduce((acc, item) => {
//   console.log(acc)
//   switch (item.type) {
//     case 'unchanged':
//       acc.push(`${item.key}: ${item.value}`);
//     case 'added':
//       acc.push(`+ ${item.key}: ${item.value}`);
//     case 'removed':
//       acc.push(`- ${item.key}: ${item.value}`);
//     case 'changed':
//       acc.push(`+ ${item.key}: ${item.newValue}`);
//       acc.push(`- ${item.key}: ${item.oldValue}`);
//     case 'parent':
//       acc.push(`${item.key}: ${stylish(item.children)}`);
//     default: console.log(1);
//   }
//   return acc
//   }, []);
// };
const isBothValuesObj = (value, value2) => {
  if (typeof(value) === 'object' && typeof(value2) === 'object') {
    return true;
  }
  return false;
};

const isIncludes = (coll, obj) => {
  const { key, value, type } = obj;
  for (const item of coll) {
    if (item.key === key && item.value === value && item.type === type) {
      return true;
    };
  }
  return false;
};

const getDiffObj = (content1, content2) => {
  const diff = (firstObj, secondObj) => {
  const innerResult = [];
  for (const key in firstObj) {
    if (Object.prototype.hasOwnProperty.call(firstObj, key)) {
      for (const sKey in secondObj) {
        if (Object.prototype.hasOwnProperty.call(secondObj, sKey)) {

          const removedObj = { key: key, value: firstObj[key], type: 'removed' };
          const addedObj = { key: sKey, value: secondObj[sKey], type: 'added' };
          const unchangedObj = { key: key, value: firstObj[key], type: 'unchanged' };
          const changedObj = { key: key, oldValue: firstObj[key], newValue: secondObj[sKey], type: 'changed'};

          if (key === sKey && isBothValuesObj(firstObj[key], secondObj[sKey])) {
            innerResult.push({ key: key, children: diff(firstObj[key], secondObj[sKey]), type: 'parent'});
          }
          if (key === sKey && firstObj[key] === secondObj[sKey]) {
            innerResult.push(unchangedObj);
          }
          if (key === sKey && firstObj[key] !== secondObj[sKey] && !isBothValuesObj(firstObj[key], secondObj[sKey])) {
            innerResult.push(changedObj);
          }
          if (!Object.prototype.hasOwnProperty.call(secondObj, key) && !isIncludes(innerResult, removedObj)) {
            innerResult.push(removedObj);
          }
          if (!Object.prototype.hasOwnProperty.call(firstObj, sKey) && !isIncludes(innerResult, addedObj)) {
            innerResult.push(addedObj);
          }
        }
      }
    }
  }
  return innerResult;
};
  const result = diff(content1, content2);
  return stylish(result);
};

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
