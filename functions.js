import isEqual from 'lodash/isEqual.js';
import isArray from 'lodash/isArray.js';
import isObject from 'lodash/isObject.js';
import toPairs from 'lodash/toPairs.js';
import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';

const valueVerification = (val, tab) => {
  if (!isObject(val)) {
    return val;
  }
  const newTab = `${tab}  `;
  const x = toPairs(val);
  const newX = x.flatMap(([key, value]) => {
    if (isObject(value)) {
      return `${newTab}\n${newTab}${key}: {\n${newTab}${valueVerification(value)}\n${newTab}}`
    }
    return `{\n${newTab}${key}:${value}`;
  });
  return newX.join('');
  //добавить сюда таб и рекурсивно вызвать эту же функцию. обработать каждое значение в stylish.
}
// const valueVerification = (val) => {
//   if (!isObject(val)) {
//     return val;
//   }
//   let tab = '';
//   const result = [];
//   for (const prop in val) {
//     if (isObject(val[prop])) {
//       result.push(`${tab}${prop}: ${valueVerification(val[prop])}`);
//     }
//     if (!isObject(val[prop])) {
//       tab += '  '
//       result.push(`${tab}${prop}: ${val[prop]}`);
//     }
//   }
//   return ['{','\n',`${tab}`,result.join(''),'\n',`${tab}`,'}'].join('');
//   //добавить сюда таб и рекурсивно вызвать эту же функцию. обработать каждое значение в stylish.
// };

const stylish = (coll) => {
  const tab = '  ';
  const result = [];
  for (const item of coll) {
    if (item.type === 'added') {
      result.push(`+ ${item.key}: ${valueVerification(item.value, tab)}\n`);
    }
    if (item.type === 'removed') {
      result.push(`- ${item.key}: ${valueVerification(item.value, tab)}\n`);
    }
    if (item.type === 'changed') {
      result.push(`+ ${item.key}: ${valueVerification(item.newValue, tab)}\n`);
      result.push(`- ${item.key}: ${valueVerification(item.oldValue, tab)}\n`);
    }
    if (item.type === 'unchanged') {
      result.push(`  ${item.key}: ${valueVerification(item.value, tab)}\n`);
    }
    if (item.type === 'parent') {
      result.push(`  ${item.key}: {\n${stylish(item.children)}}\n`);
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
