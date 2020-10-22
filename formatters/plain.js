import isObject from 'lodash/isObject.js';

const formattedValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
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

const plain = (diff) => {
  const result = diff.map((item) => {
    const iter = (iterItem, startKey = '') => {//iterItem/innerItem/innerValue ????
      const {
        key, oldValue, newValue, value, type, children,
      } = iterItem;
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
          return children.map((innerItem) => iter(innerItem, newKey)).filter((innerValue) => innerValue !== 'unchanged').join('\n');
        default:
          return `Wrong type ${type}`;
      }
    };
    return iter(item);
  });
  return result.sort().join('\n');
};

export default plain;
