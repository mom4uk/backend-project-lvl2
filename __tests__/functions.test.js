import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../functions';
import { getFileContent, getFileFormats } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const formatterStylish = 'stylish';
const formatterPlain = 'plain';

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
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

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
