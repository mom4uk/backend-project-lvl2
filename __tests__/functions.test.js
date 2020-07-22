import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../functions';
import { getFileContent, getFileFormat } from '../secondary-functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rightOutput = '{\n + verbose: true\n host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123.234.53.22\n - follow: false\n + lol: {\n    key: {\n      a:1\n    }\n   }\n - lol: true\n}';
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('output gendiff for json format', () => {
  const collOfFixtureDataJson = getFileContent(getFixturePath('/before.json'), getFixturePath('/after.json'));
  const formatFixtureFilesJson = getFileFormat(getFixturePath('/before.json'), getFixturePath('/after.json'));

  const splitedOutputGendiffForJson = genDiff(collOfFixtureDataJson, formatFixtureFilesJson);
  expect(splitedOutputGendiffForJson).toEqual(rightOutput);
});

test('output gendiff for yaml format', () => {
  const collOfFixtureDataYaml = getFileContent(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));
  const formatFixtureFilesYaml = getFileFormat(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));

  const splitedOutputGendiffForYaml = genDiff(collOfFixtureDataYaml, formatFixtureFilesYaml);
  expect(splitedOutputGendiffForYaml).toEqual(rightOutput);
});

test('output gendiff for ini format', () => {
  const collOfFixtureDataIni = getFileContent(getFixturePath('/before.ini'), getFixturePath('/after.ini'));
  const formatFixtureFilesIni = getFileFormat(getFixturePath('/before.ini'), getFixturePath('/after.ini'));

  const splitedOutputGendiffForIni = genDiff(collOfFixtureDataIni, formatFixtureFilesIni);
  expect(splitedOutputGendiffForIni).toEqual(rightOutput);
});
