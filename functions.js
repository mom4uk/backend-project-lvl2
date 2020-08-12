import isEqual from 'lodash/isEqual.js';
import { parsStrYamlToObj, parsStrIniToObj } from './parsers.js';


const stylish = (coll) => {
  const iter = (items, acc) => {
    const [item] = items;
    if (items.length === 0) {
      return `${acc}\n${'}'}`;
    }
    return iter(items.splice(1, items.length - 1), `${acc}\n ${item}`);
  };
  return iter(coll, '{');
};

const isCollHasPair = (coll, pair) => {
  for (const innerPair of coll) {
    if (isEqual(innerPair, pair)) {
      return true;
    }
  }
  return false;
};

const isCollHasKey = (coll, key) => {
  for (const row of coll) {
    if (row.includes(key)) {
      return true;
    }
  }
  return false;
};

const getDiffObj = (content1, content2) => {
  const x = Object.entries(content1);
  const y = Object.entries(content2);
  console.log(x)
  x.reduce((acc, pair1) => {
    const [key,value] = pair1;
    for (const [key2, value2] of y) {
      const minusPair1 = ['-', key, value];
      const plusPair2 = ['+', key2, value2];
      if (key === key2 && value === value2) {
        acc.push(pair1);
      }
      if (key === key2 && value !== value2) {
        acc.push(plusPair2);
        acc.push(minusPair1);
      }
      if (!isCollHasKey(y, key) && !isCollHasPair(acc, minusPair1)) {
        acc.push(minusPair1);
      }
      if (!isCollHasKey(x, key2) && !isCollHasPair(acc, plusPair2)) {
        acc.push(plusPair2);
      }
    }
    console.log(acc)
    return acc;
  }, []);
}
// const getDiffObj = (firstObj, secondObj) => {
//   const result = [];
//   for (const key in firstObj) {
//     if (Object.prototype.hasOwnProperty.call(firstObj, key)) {
//       for (const sKey in secondObj) {
//         if (Object.prototype.hasOwnProperty.call(secondObj, sKey)) {
//           if (key === sKey && firstObj[key] === secondObj[key]) {
//             result.push(`${key}: ${firstObj[key]}`);
//           }
//           if (key === sKey && firstObj[key] !== secondObj[key]) {
//             result.push(`+ ${sKey}: ${secondObj[sKey]}`);
//             result.push(`- ${key}: ${firstObj[key]}`);
//           }
//           if (!Object.prototype.hasOwnProperty.call(secondObj, key) && !result.includes(`- ${key}: ${firstObj[key]}`)) {
//             result.push(`- ${key}: ${firstObj[key]}`);
//           }
//           if (!Object.prototype.hasOwnProperty.call(firstObj, sKey) && !result.includes(`+ ${sKey}: ${secondObj[sKey]}`)) {
//             result.push(`+ ${sKey}: ${secondObj[sKey]}`);
//           }
//         }
//       }
//     }
//   }
//   console.log(result)
//   return stylish(result);
// };

const genDiff = (collOfReadedFiles, format) => {
  const [data1, data2] = collOfReadedFiles;
  switch (format) {
    case 'yaml':
      return getDiffObj(parsStrYamlToObj(data1), parsStrYamlToObj(data2));
    case 'ini':
      return getDiffObj(parsStrIniToObj(data1), parsStrIniToObj(data2));
    default:
      return getDiffObj(JSON.parse(data1), JSON.parse(data2));
  }
};

export default genDiff;
