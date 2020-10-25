import isObject from 'lodash/isObject.js';
import toPairs from 'lodash/toPairs.js';

const tab = '  ';
const openingBracket = '{';
const closingBracket = '}';
const deepShiftItem = 2;

const formatItem = (key, tabulation, sign = ' ') => `${tabulation}${sign} ${key}`;

const valueVerification = (value, tabulation) => {
  if (!isObject(value)) {
    return value;
  }
  const newTab = formatItem(tab, tabulation);
  const collPairs = toPairs(value);
  const newX = collPairs.flatMap(([key, innerValue]) => {
    if (isObject(innerValue)) {
      return `${formatItem(key, newTab)}: ${valueVerification(innerValue, newTab)}`;
    }
    return `${formatItem(key, newTab)}: ${innerValue}`;
  });
  return [openingBracket, `${newX.join('\n')}`, `${formatItem(closingBracket, tabulation)}`].join('\n');
};

const stylish = (coll) => {
  const iter = (innerColl, depth) => {
    const newTab = tab.repeat(depth);
    const result = innerColl.flatMap((obj) => {
      const {
        key, value, oldValue, newValue, type, children,
      } = obj;
      switch (type) {
        case 'added':
          return `${formatItem(key, newTab, '+')}: ${valueVerification(value, newTab)}`;
        case 'removed':
          return `${formatItem(key, newTab, '-')}: ${valueVerification(value, newTab)}`;
        case 'changed':
          return [`${formatItem(key, newTab, '+')}: ${valueVerification(newValue, newTab)}`,
            `${formatItem(key, newTab, '-')}: ${valueVerification(oldValue, newTab)}`];
        case 'unchanged':
          return `${formatItem(key, newTab)}: ${valueVerification(value, newTab)}`;
        case 'parent':
          return `${formatItem(key, newTab)}: ${openingBracket}\n${iter(children, depth + deepShiftItem)}\n${formatItem(closingBracket, newTab)}`;
        default:
          throw new Error(`Wrong type ${type}`);
      }
    });
    return result.join('\n');
  };
  return [openingBracket, iter(coll, 1), closingBracket].join('\n');
};


export default stylish;
