import toPairs from 'lodash/toPairs.js';
import isObject from 'lodash/isObject.js';

const formattedValue = (value) => {
	if(isObject(value)){
		return `[complex value]`;
	} else if (typeof value === 'string') {
		return `'${value}'`;
	}
	return value;
};

const formatKey = (coll) => {//need refactoring
	return coll.join('.');
};

const processedItem = (obj, acckey) => {
	const { key, oldValue, newValue, value, type, children } = obj;
	const newAcc = [acckey.join('.')].filter((item) => item.length !== 0);//need work with that
	switch (type) {
        case 'added':
        	newAcc.push(key);
          return `Property '${formatKey(newAcc)}' was added with value: ${formattedValue(value)}`;
        case 'removed':
        	newAcc.push(key);
          return `Property '${formatKey(newAcc)}' was removed`;
        case 'changed':
        	newAcc.push(key);
          return `Property '${formatKey(newAcc)}' was updated. From ${formattedValue(oldValue)} to ${formattedValue(newValue)}`;
        case 'unchanged': 
        	return 'unchanged';
        case 'parent':
        	acckey.push(key);
        	return children.map((x) => processedItem(x, acckey)).filter((item) => item !== 'unchanged').join('\n');
        default:
          return `Wrong type ${type}`;
      }
};

const plain = (diff) => {
	const result = diff.map((item) => processedItem(item, []));
	return result.sort().join('\n');
};

export default plain;