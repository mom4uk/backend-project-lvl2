import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getRightFormatter = (diff, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
    	return json(diff);
    default: 
    	return `Wrong formatter ${formatter}`;
  }
};

export default getRightFormatter;