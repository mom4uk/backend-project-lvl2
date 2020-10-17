import toPairs from 'lodash/toPairs.js';
import isObject from 'lodash/isObject.js';
import find from 'lodash/find.js';

const formattedValue = (value) => {
  if(isObject(value)){
    return `[complex value]`;
  } else if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatKey = (parentKey, key) => {
  if (parentKey === '') {
    return key;
  }
  return `${parentKey}.${key}`;
};

const processedItem = (obj, startKey = '') => {
  const { key, oldValue, newValue, value, type, children } = obj;
  const newKey = formatKey(startKey, key);
  switch (type) {
        case 'added':
          return `Property '${newKey}' was added with value: ${formattedValue(value)}`;
        case 'removed':
          return `Property '${newKey}' was removed`;
        case 'changed':
          return `Property '${newKey}' was updated. From ${formattedValue(oldValue)} to ${formattedValue(newValue)}`;
        case 'unchanged': 
          return 'unchanged';
        case 'parent':
          return children.map((x) => processedItem(x, newKey)).filter((item) => item !== 'unchanged').join('\n');
        default:
          return `Wrong type ${type}`;
      }
};

const plain = (diff) => {
  const result = diff.map((item) => {
    return processedItem(item);
  });
  return result.sort().join('\n');
};

export default plain;