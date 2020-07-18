import path from 'path';
import fs from 'fs';

export const getReadedFiles = (firstPathToFile, secondPathToFile) => {
  const firstAbsolutePath = path.resolve(firstPathToFile);
  const secondAbsolutePath = path.resolve(secondPathToFile);
  const firstReadedFile = fs.readFileSync(firstAbsolutePath, 'utf8');
  const secondReadedFile = fs.readFileSync(secondAbsolutePath, 'utf8');
  return [firstReadedFile, secondReadedFile];
};

export const getFilesFormat = (firstPathToFile, secondPathToFile) => {
  const firstFileFormat = path.extname(firstPathToFile);
  const secondFileFormat = path.extname(secondPathToFile);
  if (firstFileFormat === '.yaml' && secondFileFormat === '.yaml') {
    return 'yaml';
  }
  if (firstFileFormat === '.ini' && secondFileFormat === '.ini') {
    return 'ini';
  }
  return 'json';
};
