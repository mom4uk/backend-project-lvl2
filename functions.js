import isEqual from 'lodash/isEqual.js';
import isArray from 'lodash/isarray.js';
import isObject from 'lodash/isObject.js';
import includes from 'lodash/includes.js';
import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';

const stylish = (obj) => {

};

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
  const result = [];
  for (const key in firstObj) {
    if (Object.prototype.hasOwnProperty.call(firstObj, key)) {
      for (const sKey in secondObj) {
        if (Object.prototype.hasOwnProperty.call(secondObj, sKey)) {
          const removedObj = { key: key, value: firstObj[key], type: 'removed' };
          const addedObj = { key: sKey, value: secondObj[sKey], type: 'added' };
          const 
          if (key === sKey && isBothValuesObj(firstObj[key], secondObj[sKey])) {
            result.push({ key: key, children: diff(firstObj[key], secondObj[sKey]), type: 'parent'});
          }
          if (key === sKey && firstObj[key] === secondObj[sKey]) {
            result.push({ key: key, value: firstObj[key], type: 'unchanged' });
          }
          if (key === sKey && firstObj[key] !== secondObj[sKey] && !isBothValuesObj(firstObj[key], secondObj[sKey])) {
            result.push({ key: key, oldValue: firstObj[key], newValue: secondObj[sKey], type: 'changed'});
          }
          if (!Object.prototype.hasOwnProperty.call(secondObj, key) && !isIncludes(result, removedObj)) {
            result.push(removedObj);
          }
          if (!Object.prototype.hasOwnProperty.call(firstObj, sKey) && !isIncludes(result, addedObj)) {
            result.push(addedObj);
          }
        }
      }
    }
  }
  return result;
};
  return diff(content1, content2);
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
