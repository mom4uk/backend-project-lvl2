import _ from 'lodash';
import getRightFormatter from './src/formatters/index.js';
import { readFile, getFileFormat } from './src/utils.js';
import parse from './src/parsers.js';

export default (filepath1, filepath2, formatName) => {
  const data1 = parse(readFile(filepath1), getFileFormat(filepath1));
  const data2 = parse(readFile(filepath2), getFileFormat(filepath2));
  const iter = (content1, content2) => {
    const sharedKeys = _.uniq([..._.keys(content1), ..._.keys(content2)]).sort();
    return sharedKeys.map((key) => {
      const value1 = content1[key];
      const value2 = content2[key];
      if (!_.has(content1, key)) {
        return {
          key,
          value: value2,
          type: 'added',
        };
      }
      if (!_.has(content2, key)) {
        return {
          key,
          value: value1,
          type: 'removed',
        };
      }
      if (_.has(content2, key) && value1 === value2) {
        return {
          key,
          value: value1,
          type: 'unchanged',
        };
      }
      if (_.has(content2, key) && _.isObject(value1) && _.isObject(value2)) {
        return {
          key,
          children: iter(value1, value2),
          type: 'parent',
        };
      }
      return {
        key,
        oldValue: value1,
        newValue: value2,
        type: 'changed',
      };
    });
  };
  const result = iter(data1, data2);
  return getRightFormatter(result, formatName);
};
