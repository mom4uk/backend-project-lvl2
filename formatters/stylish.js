import isObject from 'lodash/isObject.js';
import toPairs from 'lodash/toPairs.js';

const tab = '  ';

const formatKey = (key, tabulation, sign = ' ') => `${tabulation}${sign} ${key}`;

const valueVerification = (val, tabulation) => {
  if (!isObject(val)) {
    return val;
  }
  const newTab = formatKey(tab, tabulation);
  const x = toPairs(val);
  const newX = x.flatMap(([key, value]) => {
    if (isObject(value)) {
      return `${formatKey(key, newTab)}: ${valueVerification(value, newTab)}`;
    }
    return `${formatKey(key, newTab)}: ${value}`;
  });
  return ['{', '\n', `${newX.join('\n')}`, '\n', `${formatKey('}', tabulation)}`].join(''); // добавить в join '\n'?
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
          return `${formatKey(key, newTab, '+')}: ${valueVerification(value, newTab)}\n`;
        case 'removed':
          return `${formatKey(key, newTab, '-')}: ${valueVerification(value, newTab)}\n`;
        case 'changed':
          return [`${formatKey(key, newTab, '+')}: ${valueVerification(newValue, newTab)}\n`,
            `${formatKey(key, newTab, '-')}: ${valueVerification(oldValue, newTab)}\n`];
        case 'unchanged':
          return `${formatKey(key, newTab)}: ${valueVerification(value, newTab)}\n`;
        case 'parent':
          return `${formatKey(key, newTab)}: {\n${iter(children, lvl + 2)}${formatKey('}', newTab)}\n`;
        default:
          return `Wrong type ${type}`;
      }
    });
    return result.join(''); // \n ?
  };
  return ['{', '\n', iter(coll, 1), '}'].join('');
};


export default stylish;
