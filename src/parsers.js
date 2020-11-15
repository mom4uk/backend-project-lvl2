import yaml from 'js-yaml';
import ini from 'ini';
import { normalizeIni } from './utils.js';

const parseYaml = (data) => yaml.safeLoad(data);
const parseIni = (data) => normalizeIni(ini.parse(data));

export default (content, format) => {
  switch (format) {
    case 'yaml':
      return parseYaml(content);
    case 'ini':
      return parseIni(content);
    case 'json':
      return JSON.parse(content);
    default:
      throw new Error(`Error in parse arguments: ${content}, ${format}`);
  }
};
