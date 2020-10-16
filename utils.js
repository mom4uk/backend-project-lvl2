import path from 'path';
import fs from 'fs';
import isObject from 'lodash/isObject.js';
import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';

export const getFileContent = (firstPathToFile, secondPathToFile) => {
  const firstAbsolutePath = path.resolve(firstPathToFile);
  const secondAbsolutePath = path.resolve(secondPathToFile);
  const firstReadedFile = fs.readFileSync(firstAbsolutePath, 'utf8');
  const secondReadedFile = fs.readFileSync(secondAbsolutePath, 'utf8');
  return [firstReadedFile, secondReadedFile];
};

export const getFileFormats = (firstPathToFile, secondPathToFile) => {
  const firstFileFormat = path.extname(firstPathToFile);
  const secondFileFormat = path.extname(secondPathToFile);
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

export const isBothValuesObj = (value, value2) => {
  if (isObject(value) && isObject(value2)) {
    return true;
  }
  return false;
};

export const parseData = (collOfReadedFiles, format) => {
  const [data1, data2] = collOfReadedFiles;
  switch (format) {
    case 'yaml':
      return [parsStrYamlToObj(data1), parsStrYamlToObj(data2)];
    case 'ini':
      return [parsStrIniToObj(data1), parsStrIniToObj(data2)];
    case 'json':
      return [JSON.parse(data1), JSON.parse(data2)];
    default:
      return `Error in parseData arguments: ${collOfReadedFiles}, ${format}`;
  }
};
