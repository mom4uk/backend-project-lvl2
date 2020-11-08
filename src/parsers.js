import yaml from 'js-yaml';
import ini from 'ini';

const parsStrYamlToObj = (yamlStr) => yaml.safeLoad(yamlStr);
const parsStrIniToObj = (iniStr) => ini.parse(iniStr);

const parse = (contents, format) => {
  const [data1, data2] = contents;
  switch (format) {
    case 'yaml':
      return [parsStrYamlToObj(data1), parsStrYamlToObj(data2)];
    case 'ini':
      return [parsStrIniToObj(data1), parsStrIniToObj(data2)];
    case 'json':
      return [JSON.parse(data1), JSON.parse(data2)];
    default:
      throw new Error(`Error in parseData arguments: ${contents}, ${format}`);
  }
};

export default parse;