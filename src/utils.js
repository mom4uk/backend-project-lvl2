import path from 'path';
import fs from 'fs';
import isObject from 'lodash/isObject.js';

export const getFileContents = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(filepath1);
  const absolutePath2 = path.resolve(filepath2);
  const readedFile1 = fs.readFileSync(absolutePath1, 'utf8');
  const readedFile2 = fs.readFileSync(absolutePath2, 'utf8');
  return [readedFile1, readedFile2];
};

export const getFileFormat = (filepath1, filepath2) => {
  const firstFileFormat = path.extname(filepath1);
  const secondFileFormat = path.extname(filepath2);
  if (firstFileFormat === '.yaml' && secondFileFormat === '.yaml') {
    return 'yaml';
  }
  if (firstFileFormat === '.ini' && secondFileFormat === '.ini') {
    return 'ini';
  }
  if (firstFileFormat === '.json' && secondFileFormat === '.json') {
    return 'json';
  }
  return `The program does not support this formats ${firstFileFormat}, ${secondFileFormat} or you cannot compare 2 different formats`;
};
