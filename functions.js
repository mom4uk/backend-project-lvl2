import isObject from 'lodash/isObject.js';
import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';
import stylish from './formatters/stylish.js';

const isBothValuesObj = (value, value2) => {
  if (isObject(value) && isObject(value2)) {
    return true;
  }
  return false;
};

const isIncludes = (coll, obj) => {
  const { key, value, type } = obj;
  for (const item of coll) {
    if (item.key === key && item.value === value && item.type === type) {
      return true;
    }
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
            const removedObj = { key, value: firstObj[key], type: 'removed' };
            const addedObj = { key: sKey, value: secondObj[sKey], type: 'added' };
            const unchangedObj = { key, value: firstObj[key], type: 'unchanged' };
            const changedObj = {
              key, oldValue: firstObj[key], newValue: secondObj[sKey], type: 'changed',
            };

            if (key === sKey && isBothValuesObj(firstObj[key], secondObj[sKey])) {
              innerResult.push({ key, children: diff(firstObj[key], secondObj[sKey]), type: 'parent' });
            }
            if (key === sKey && firstObj[key] === secondObj[sKey]) {
              innerResult.push(unchangedObj);
            }
            if (key === sKey && firstObj[key] !== secondObj[sKey]
              && !isBothValuesObj(firstObj[key], secondObj[sKey])) {
              innerResult.push(changedObj);
            }
            if (!Object.prototype.hasOwnProperty.call(secondObj, key)
              && !isIncludes(innerResult, removedObj)) {
              innerResult.push(removedObj);
            }
            if (!Object.prototype.hasOwnProperty.call(firstObj, sKey)
              && !isIncludes(innerResult, addedObj)) {
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
