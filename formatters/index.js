import stylish from './stylish.js';
import plain from './plain.js';

const getRightFormatter = (diff, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default: 
    	return `Wrong formatter ${formatter}`;
  }
};

export default getRightFormatter;