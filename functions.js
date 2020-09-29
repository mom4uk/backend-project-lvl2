import isEqual from 'lodash/isEqual.js';
import isArray from 'lodash/isArray.js';
import isObject from 'lodash/isObject.js';
import toPairs from 'lodash/toPairs.js';
import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';

const valueVerification = (val, tab) => {
  if (!isObject(val)) {
    return val;
  }
  const newTab = `${tab}  `
  const x = toPairs(val);
  const newX = x.flatMap(([key, value]) => {
    if (isObject(value)) {
      return `${formatKey(key, newTab)}: ${valueVerification(value, newTab)}`;
    }
    return `${formatKey(key, newTab)}: ${value}`;
  });
  return ['{','\n',`${newTab}`,`${newX.join(`\n${newTab}`)}`, '\n', '  ',`${newTab}`, '}'].join('');
};

const formatKey = (key, tab, sign = ' ') => {
  return `${tab}${sign} ${key}`;
};

const stylish = (coll) => {
  const iter = (innerColl, lvl) => {
    const twoSpace = '  ';
    const newTab = twoSpace.repeat(lvl);
    const result = innerColl.flatMap((obj) => {
      const { key, value, oldValue, newValue, type, children } = obj;
      switch (type) {
        case 'added':
          return `${formatKey(key, newTab, '+')}: ${valueVerification(value, newTab)}\n`;
        case 'removed':
          return `${formatKey(key, newTab, '-')}: ${valueVerification(value, newTab)}\n`;
        case 'changed':
          return [`${formatKey(key, newTab, '+')}: ${valueVerification(newValue, newTab)}\n`,
          `${formatKey(key, newTab, '-')}: ${valueVerification(oldValue, newTab)}\n`];
        case 'unchanged':
          return `${formatKey(key, newTab)}: ${valueVerification(value, newTab)}\n`;
        case 'parent':
          return `${formatKey(key, newTab)}: {\n${iter(children, lvl + 2)}${formatKey('}', newTab)}\n`;
        default:
          console.log(`Wrong type ${type}`);
        }
    })
    return result.join('');
  };
  return iter(coll, 0);
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
