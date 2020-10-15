import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';
import getRightFormatter from './formatters/index.js';
import { isBothValuesObj, isIncludes } from './utils.js';
import keys from 'lodash/keys.js';
import uniq from 'lodash/uniq.js';

const getDiffObj = (content1, content2) => {
  const iter = (con1, con2) => {
  const keysContent1 = keys(con1);
  const keysContent2 = keys(con2);
  const sharedKeys = uniq([...keysContent1, ...keysContent2]);
  return sharedKeys.reduce((acc, key) => {
    if (con2.hasOwnProperty(key) && isBothValuesObj(con1[key], con2[key])) {
      acc.push({ key, children: iter(con1[key], con2[key]), type: 'parent' });
    }
    if (con2.hasOwnProperty(key) && con1[key] === con2[key]) {
      acc.push({ key, value: con1[key], type: 'unchanged' });
    }
    if (!con2.hasOwnProperty(key)) {
      acc.push({ key, value: con1[key], type: 'removed'});
    }
    if (!con1.hasOwnProperty(key)) {
      acc.push({ key, value: con2[key], type: 'added'});
    }
    if (con1.hasOwnProperty(key) && con2.hasOwnProperty(key) 
      && con1[key] !== con2[key] && !isBothValuesObj(con1[key], con2[key])) {
      acc.push({key , oldValue: con1[key], newValue: con2[key], type: 'changed'});
    }
    return acc;
  }, []);
  }
  const diff = iter(content1, content2);
  console.log(diff[0])
  return diff;
};
// const getDiffObj = (content1, content2, formatter) => {
//   const diff = (firstObj, secondObj) => {
//     const innerResult = [];
//     for (const key in firstObj) {
//       if (Object.prototype.hasOwnProperty.call(firstObj, key)) {
//         for (const sKey in secondObj) {
//           if (Object.prototype.hasOwnProperty.call(secondObj, sKey)) {
//             const removedObj = { key, value: firstObj[key], type: 'removed' };
//             const addedObj = { key: sKey, value: secondObj[sKey], type: 'added' };
//             const unchangedObj = { key, value: firstObj[key], type: 'unchanged' };
//             const changedObj = {
//               key, oldValue: firstObj[key], newValue: secondObj[sKey], type: 'changed',
//             };

//             if (key === sKey && isBothValuesObj(firstObj[key], secondObj[sKey])) {
//               innerResult.push({ key, children: diff(firstObj[key], secondObj[sKey]), type: 'parent' });
//             }
//             if (key === sKey && firstObj[key] === secondObj[sKey]) {
//               innerResult.push(unchangedObj);
//             }
//             if (key === sKey && firstObj[key] !== secondObj[sKey]
//               && !isBothValuesObj(firstObj[key], secondObj[sKey])) {
//               innerResult.push(changedObj);
//             }
//             if (!Object.prototype.hasOwnProperty.call(secondObj, key)
//               && !isIncludes(innerResult, removedObj)) {
//               innerResult.push(removedObj);
//             }
//             if (!Object.prototype.hasOwnProperty.call(firstObj, sKey)
//               && !isIncludes(innerResult, addedObj)) {
//               innerResult.push(addedObj);
//             }
//           }
//         }
//       }
//     }
//     return innerResult;
//   };
//   const result = diff(content1, content2);
//   return getRightFormatter(result, formatter);
// };

const genDiff = (collOfReadedFiles, format, formatter) => {//поменяй название и убери функцию в utils
  const [data1, data2] = collOfReadedFiles;
  switch (format) {
    case 'yaml':
      return getDiffObj(parsStrYamlToObj(data1), parsStrYamlToObj(data2), formatter);
    case 'ini':
      return getDiffObj(parsStrIniToObj(data1), parsStrIniToObj(data2), formatter);
    default:
      return getDiffObj(JSON.parse(data1), JSON.parse(data2), formatter);
  }
};

export default genDiff;
