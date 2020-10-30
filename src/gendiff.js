import keys from 'lodash/keys.js';
import uniq from 'lodash/uniq.js';
import has from 'lodash/has.js';
import getRightFormatter from './formatters/index.js';
import {
  isBothValuesObj, parse, getFileContents, getFileFormat,
} from './utils.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const fileContents = getFileContents(filepath1, filepath2);
  const filesFormat = getFileFormat(filepath1, filepath2);
  const parsedData = parse(fileContents, filesFormat);
  const [data1, data2] = parsedData;
  const iter = (content1, content2) => {
    const sharedKeys = uniq([...keys(content1), ...keys(content2)]).sort();
    return sharedKeys.reduce((acc, key) => {
      const value1 = content1[key];
      const value2 = content2[key];
      if (has(content2, key) && isBothValuesObj(value1, value2)) {
        acc.push({ key, children: iter(value1, value2), type: 'parent' });
      }
      if (has(content2, key) && value1 === value2) {
        acc.push({ key, value: value1, type: 'unchanged' });
      }
      if (has(content1, key) && has(content2, key)
      && value1 !== value2 && !isBothValuesObj(value1, value2)) {
        acc.push({
          key, oldValue: value1, newValue: value2, type: 'changed',
        });
      }
      if (!has(content2, key)) {
        acc.push({ key, value: value1, type: 'removed' });
      }
      if (!has(content1, key)) {
        acc.push({ key, value: value2, type: 'added' });
      }
      return acc;
    }, []);
  };
  const result = iter(data1, data2);
  return getRightFormatter(result, formatName);
};

export default genDiff;
