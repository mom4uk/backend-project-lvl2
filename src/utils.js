import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

export const getFileFormat = (filepath) => {
  const fileFormat = path.extname(filepath);
  switch (fileFormat) {
    case '.yaml':
      return 'yaml';
    case '.ini':
      return 'ini';
    case '.json':
      return 'json';
    default:
      throw Error(`The program does not support this format ${fileFormat}`);
  }
};

export const normalizeIni = (data) => _.mapValues(data, (value) => {
  if (_.isObject(value)) {
    return normalizeIni(value);
  }
  const parsedValue = parseFloat(value);
  return _.isNaN(parsedValue) ? value : parsedValue;
});

export const getTreeDiff = (content1, content2) => {
  const uniqueKeys = _.uniq([..._.keys(content1), ..._.keys(content2)]).sort();
  return uniqueKeys.map((key) => {
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
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        children: getTreeDiff(value1, value2),
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
