import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(`Wrong formatter ${formatter}`);
  }
};
