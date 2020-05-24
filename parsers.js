import yaml from 'js-yaml';

const parsStrYamlToObj = (yamlStr) => yaml.safeLoad(yamlStr);
export default parsStrYamlToObj;
