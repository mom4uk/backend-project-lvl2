import formattedDiff from './src/formatters/index';
import { readFile, getFileFormat, getTreeDiff } from './src/utils';
import parse from './src/parsers';

export default (filepath1, filepath2, formatName) => {
  const data1 = parse(readFile(filepath1), getFileFormat(filepath1));
  const data2 = parse(readFile(filepath2), getFileFormat(filepath2));
  const result = getTreeDiff(data1, data2);
  return formattedDiff(result, formatName);
};
