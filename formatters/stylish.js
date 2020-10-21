import isObject from 'lodash/isObject.js';
import toPairs from 'lodash/toPairs.js';

const tab = '  ';

const formatItem = (key, tabulation, sign = ' ') => `${tabulation}${sign} ${key}`;

const valueVerification = (val, tabulation) => {
  if (!isObject(val)) {
    return val;
  }
  const newTab = formatItem(tab, tabulation);
  const x = toPairs(val);
  const newX = x.flatMap(([key, value]) => {
    if (isObject(value)) {
      return `${formatItem(key, newTab)}: ${valueVerification(value, newTab)}`;
    }
    return `${formatItem(key, newTab)}: ${value}`;
  });
  return ['{', `${newX.join('\n')}`, `${formatItem('}', tabulation)}`].join('\n');
};

const stylish = (coll) => {
  const iter = (innerColl, lvl) => {
    const newTab = tab.repeat(lvl);
    const result = innerColl.flatMap((obj) => {
      const {
        key, value, oldValue, newValue, type, children,
      } = obj;
      switch (type) {
        case 'added':
          return `${formatItem(key, newTab, '+')}: ${valueVerification(value, newTab)}\n`;
        case 'removed':
          return `${formatItem(key, newTab, '-')}: ${valueVerification(value, newTab)}\n`;
        case 'changed':
          return [`${formatItem(key, newTab, '+')}: ${valueVerification(newValue, newTab)}\n`,
            `${formatItem(key, newTab, '-')}: ${valueVerification(oldValue, newTab)}\n`];
        case 'unchanged':
          return `${formatItem(key, newTab)}: ${valueVerification(value, newTab)}\n`;
        case 'parent':
          return `${formatItem(key, newTab)}: {\n${iter(children, lvl + 2)}${formatItem('}', newTab)}\n`;
        default:
          return `Wrong type ${type}`;
      }
    });
    return result.join('');
  };
  return ['{', '\n', iter(coll, 1), '}'].join('');
};


export default stylish;
