import path from 'path';
import fs from 'fs';

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
  else {
    console.log(`The program does not support this formats ${ firstFileFormat }, ${ secondFileFormat } or you cannot compare 2 different formats`);
  }
};
