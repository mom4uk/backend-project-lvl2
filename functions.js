import keys from 'lodash/keys.js';
import uniq from 'lodash/uniq.js';
import getRightFormatter from './formatters/index.js';
import { isBothValuesObj, parseData } from './utils.js';

const genDiff = (collOfReadedFiles, format, formatter) => {
  const parsedData = parseData(collOfReadedFiles, format);
  const [data1, data2] = parsedData;
  const iter = (con1, con2) => {
  const keysContent1 = keys(con1);
  const keysContent2 = keys(con2);
  const sharedKeys = uniq([...keysContent1, ...keysContent2]).sort();
  return sharedKeys.reduce((acc, key) => {
    if (con2.hasOwnProperty(key) && isBothValuesObj(con1[key], con2[key])) {
      acc.push({ key, children: iter(con1[key], con2[key]), type: 'parent' });
    }
    if (con2.hasOwnProperty(key) && con1[key] === con2[key]) {
      acc.push({ key, value: con1[key], type: 'unchanged' });
    }
    if (con1.hasOwnProperty(key) && con2.hasOwnProperty(key) 
      && con1[key] !== con2[key] && !isBothValuesObj(con1[key], con2[key])) {
      acc.push({key , oldValue: con1[key], newValue: con2[key], type: 'changed'});
    }
    if (!con2.hasOwnProperty(key)) {
      acc.push({ key, value: con1[key], type: 'removed'});
    }
    if (!con1.hasOwnProperty(key)) {
      acc.push({ key, value: con2[key], type: 'added'});
    }
    return acc;
  }, []);
  }
  const result = iter(data1, data2);
  return getRightFormatter(result, formatter);
};

export default genDiff;
