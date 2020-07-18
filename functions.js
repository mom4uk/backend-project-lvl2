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

const getDiffObj = (firstObj, secondObj) => {
  const result = [];
  for (const key in firstObj) {
    if (Object.prototype.hasOwnProperty.call(firstObj, key)) {
      for (const sKey in secondObj) {
        if (Object.prototype.hasOwnProperty.call(secondObj, sKey)) {
          if (key === sKey && firstObj[key] === secondObj[key]) {
            result.push(`${key}: ${firstObj[key]}`);
          }
          if (key === sKey && firstObj[key] !== secondObj[key]) {
            result.push(`+ ${sKey}: ${secondObj[sKey]}`);
            result.push(`- ${key}: ${firstObj[key]}`);
          }
          if (!Object.prototype.hasOwnProperty.call(secondObj, key) && !result.includes(`- ${key}: ${firstObj[key]}`)) {
            result.push(`- ${key}: ${firstObj[key]}`);
          }
          if (!Object.prototype.hasOwnProperty.call(firstObj, sKey) && !result.includes(`+ ${sKey}: ${secondObj[sKey]}`)) {
            result.push(`+ ${sKey}: ${secondObj[sKey]}`);
          }
        }
      }
    }
  }
  return stylish(result);
};

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
