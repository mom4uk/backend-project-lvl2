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
