import yaml from 'js-yaml';
import ini from 'ini';

const parsStrYamlToObj = (yamlStr) => yaml.safeLoad(yamlStr);
const parsStrIniToObj = (iniStr) => ini.parse(iniStr);
export { parsStrYamlToObj, parsStrIniToObj };
