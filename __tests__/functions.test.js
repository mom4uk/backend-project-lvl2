import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../functions';
import { getFileContent, getFileFormats } from '../secondary-functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rightOutput = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
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
}`
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('output gendiff for json format', () => {
  const collOfFixtureDataJson = getFileContent(getFixturePath('/before.json'), getFixturePath('/after.json'));
  const formatFixtureFilesJson = getFileFormats(getFixturePath('/before.json'), getFixturePath('/after.json'));

  const splitedOutputGendiffForJson = genDiff(collOfFixtureDataJson, formatFixtureFilesJson);
  expect(splitedOutputGendiffForJson).toEqual(rightOutput);
});

test('output gendiff for yaml format', () => {
  const collOfFixtureDataYaml = getFileContent(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));
  const formatFixtureFilesYaml = getFileFormats(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));

  const splitedOutputGendiffForYaml = genDiff(collOfFixtureDataYaml, formatFixtureFilesYaml);
  expect(splitedOutputGendiffForYaml).toEqual(rightOutput);
});

test('output gendiff for ini format', () => {
  const collOfFixtureDataIni = getFileContent(getFixturePath('/before.ini'), getFixturePath('/after.ini'));
  const formatFixtureFilesIni = getFileFormats(getFixturePath('/before.ini'), getFixturePath('/after.ini'));

  const splitedOutputGendiffForIni = genDiff(collOfFixtureDataIni, formatFixtureFilesIni);
  expect(splitedOutputGendiffForIni).toEqual(rightOutput);
});
