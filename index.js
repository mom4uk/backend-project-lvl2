import _ from 'lodash';
import getRightFormatter from './src/formatters/index.js';
import { readFile, getFileFormat } from './src/utils.js';
import parse from './src/parsers.js';

export default (filepath1, filepath2, formatName) => {
  const data1 = parse(readFile(filepath1), getFileFormat(filepath1));
  const data2 = parse(readFile(filepath2), getFileFormat(filepath2));
  const iter = (content1, content2) => {
    const sharedKeys = _.uniq([..._.keys(content1), ..._.keys(content2)]);
    const sortedSharedKeys = sharedKeys.sort();
    return sortedSharedKeys.reduce((acc, key) => {
      const value1 = content1[key];
      const value2 = content2[key];
      if (_.has(content2, key) && _.isObject(value1) && _.isObject(value2)) {
        return [...acc,
          {
            key,
            children: iter(value1, value2),
            type: 'parent',
          }];
      }
      if (_.has(content2, key) && value1 === value2) {
        return [...acc,
          {
            key,
            value: value1,
            type: 'unchanged',
          }];
      }
      if (_.has(content1, key) && _.has(content2, key)
      && value1 !== value2 && (!_.isObject(value1) || !_.isObject(value2))) {
        return [...acc,
          {
            key,
            oldValue: value1,
            newValue: value2,
            type: 'changed',
          }];
      }
      if (!_.has(content2, key)) {
        return [...acc,
          {
            key,
            value: value1,
            type: 'removed',
          }];
      }
      if (!_.has(content1, key)) {
        return [...acc,
          {
            key,
            value: value2,
            type: 'added',
          }];
      }
      return acc;
    }, []);
  };
  const result = iter(data1, data2);
  return getRightFormatter(result, formatName);
};
