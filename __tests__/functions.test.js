import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../functions.js';
import { getFileContent, getFileFormats } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const formatterStylish = 'stylish';
const formatterPlain = 'plain';
const formatterJson = 'json';

const rightOutputStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
      - setting2: 200
      + setting3: {
            key: value
        }
      - setting3: true
        setting6: {
            key: value
          + ops: vops
            doge: {
              + wow: so much
              - wow: too much
            }
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      + nest: str
      - nest: {
            key: value
        }
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
}`;

const rightOutputPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const rightOutputJson = `[{"key":"common","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting2","value":"200,"type":"removed"},{"key":"setting3","oldValue":true,"newValue":{"key":"value"},"type":"changed"},{"key":"setting6","children":[{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"},{"key":"doge","children":[{"key":"wow","oldValue":"too much","newValue":"so much","type":"changed"}],"type":"parent"}],"type":"parent"}],"type":"parent"},{"key":"group3","value":{"fee":"100500","deep":{"id":{"number":"45"}}},"type":"added"},{"key":"group1","children":[{"key":"baz","oldValue":"bas","newValue":"bars","type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","oldValue":{"key":"value"},"newValue":"str","type":"changed"}],"type":"parent"},{"key":"group2","value":{"abc":"12345","deep":{"id":"45"}},"type":"removed"}]`;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('output gendiff for stylish formatter', () => {
  const collOfFixtureDataJson = getFileContent(getFixturePath('/before.json'), getFixturePath('/after.json'));
  const formatFixtureFilesJson = getFileFormats(getFixturePath('/before.json'), getFixturePath('/after.json'));

  const collOfFixtureDataYaml = getFileContent(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));
  const formatFixtureFilesYaml = getFileFormats(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));

  const collOfFixtureDataIni = getFileContent(getFixturePath('/before.ini'), getFixturePath('/after.ini'));
  const formatFixtureFilesIni = getFileFormats(getFixturePath('/before.ini'), getFixturePath('/after.ini'));

  const splitedOutputGendiffForJson = genDiff(collOfFixtureDataJson, formatFixtureFilesJson, formatterStylish);
  expect(splitedOutputGendiffForJson).toEqual(rightOutputStylish);

  const splitedOutputGendiffForYaml = genDiff(collOfFixtureDataYaml, formatFixtureFilesYaml, formatterStylish);
  expect(splitedOutputGendiffForYaml).toEqual(rightOutputStylish);

  const splitedOutputGendiffForIni = genDiff(collOfFixtureDataIni, formatFixtureFilesIni, formatterStylish);
  expect(splitedOutputGendiffForIni).toEqual(rightOutputStylish);
});

test('output gendiff for plain formatter', () => {
  const collOfFixtureDataJson = getFileContent(getFixturePath('/before.json'), getFixturePath('/after.json'));
  const formatFixtureFilesJson = getFileFormats(getFixturePath('/before.json'), getFixturePath('/after.json'));

  const collOfFixtureDataYaml = getFileContent(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));
  const formatFixtureFilesYaml = getFileFormats(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));

  const collOfFixtureDataIni = getFileContent(getFixturePath('/before.ini'), getFixturePath('/after.ini'));
  const formatFixtureFilesIni = getFileFormats(getFixturePath('/before.ini'), getFixturePath('/after.ini'));

  const splitedOutputGendiffForJson = genDiff(collOfFixtureDataJson, formatFixtureFilesJson, formatterPlain);
  expect(splitedOutputGendiffForJson).toEqual(rightOutputPlain);

  const splitedOutputGendiffForYaml = genDiff(collOfFixtureDataYaml, formatFixtureFilesYaml, formatterPlain);
  expect(splitedOutputGendiffForYaml).toEqual(rightOutputPlain);

  const splitedOutputGendiffForIni = genDiff(collOfFixtureDataIni, formatFixtureFilesIni, formatterPlain);
  expect(splitedOutputGendiffForIni).toEqual(rightOutputPlain);
});

test('output gendiff for json formatter', () => {
  const collOfFixtureDataJson = getFileContent(getFixturePath('/before.json'), getFixturePath('/after.json'));
  const formatFixtureFilesJson = getFileFormats(getFixturePath('/before.json'), getFixturePath('/after.json'));

  const collOfFixtureDataYaml = getFileContent(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));
  const formatFixtureFilesYaml = getFileFormats(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));

  const collOfFixtureDataIni = getFileContent(getFixturePath('/before.ini'), getFixturePath('/after.ini'));
  const formatFixtureFilesIni = getFileFormats(getFixturePath('/before.ini'), getFixturePath('/after.ini'));

  const splitedOutputGendiffForJson = genDiff(collOfFixtureDataJson, formatFixtureFilesJson, formatterJson);
  expect(splitedOutputGendiffForJson).toEqual(rightOutputJson);

  const splitedOutputGendiffForYaml = genDiff(collOfFixtureDataYaml, formatFixtureFilesYaml, formatterJson);
  expect(splitedOutputGendiffForYaml).toEqual(rightOutputJson);

  const splitedOutputGendiffForIni = genDiff(collOfFixtureDataIni, formatFixtureFilesIni, formatterJson);
  expect(splitedOutputGendiffForIni).toEqual(rightOutputJson);
});
