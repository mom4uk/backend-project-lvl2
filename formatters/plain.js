import toPairs from 'lodash/toPairs.js';
import isObject from 'lodash/isObject.js';

const processedItem = (item, type, nkey) => {
	const formattedValue = (value) => isObject(value) ? `[complex value]` : value;
	const newKey = [nkey];
	const { key, oldValue, newValue, value } = item;
	const x = newKey.push(key);
	switch (type) {
        case 'added':
          return `Property '${newKey.join('.')}' was added with value: ${formattedValue(value)}`;
        case 'removed':
          return `Property '${newKey.join('.')}' was removed`;
        case 'changed':
          return `Property '${newKey.join('.')}' was updated. From ${formattedValue(oldValue)} to '${formattedValue(newValue)}'`;
        case 'unchanged': 
        	return ''
        default:
          return `Wrong type ${type}`;
      }
};

const plain = (diff) => {
	const iter = (innerItem, nkey = '') => {
  const result = innerItem.flatMap((item) => {
    const {
      key, type, children,
    } = item;
  	switch (type) {
        case 'added':
          return processedItem(item, type, nkey);
        case 'removed':
          return processedItem(item, type, nkey);
        case 'changed':
          return processedItem(item, type, nkey);
        case 'parent':
        	return iter(children, key);
        case 'unchanged': 
        	return ''
        default:
          return `Wrong type ${type}`;
      }
  });
  return result.join('\n');
}
return iter(diff);
};

export default plain;