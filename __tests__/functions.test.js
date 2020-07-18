import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../functions';
import { getReadedFiles, getFilesFormat } from '../secondary-functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedLength = 10;

test('output gendiff for json format', () => {
  const collOfFixtureDataJson = getReadedFiles(getFixturePath('/before.json'), getFixturePath('/after.json'));
  const formatFixtureFilesJson = getFilesFormat(getFixturePath('/before.json'), getFixturePath('/after.json'));

  const splitedOutputGendiffForJson = genDiff(collOfFixtureDataJson, formatFixtureFilesJson).split('\n');
  expect(splitedOutputGendiffForJson).toContain(
    '{',
    ' + verbose: true',
    ' host: hexlet.io',
    ' + timeout: 20',
    ' - timeout: 50',
    ' - proxy: 123.234.53.22',
    ' - follow: false',
    ' + lol: {\nkey: { \na: 1\n}',
    ' - lol: true',
    '}',
  );
  expect(splitedOutputGendiffForJson.length).toEqual(expectedLength);
});

test('output gendiff for yaml format', () => {
  const collOfFixtureDataYaml = getReadedFiles(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));
  const formatFixtureFilesYaml = getFilesFormat(getFixturePath('/before.yaml'), getFixturePath('/after.yaml'));

  const splitedOutputGendiffForYaml = genDiff(collOfFixtureDataYaml, formatFixtureFilesYaml).split('\n');
  expect(splitedOutputGendiffForYaml).toContain(
    '{',
    ' + verbose: true',
    ' host: hexlet.io',
    ' + timeout: 20',
    ' - timeout: 50',
    ' - proxy: 123.234.53.22',
    ' - follow: false',
    ' + lol: {\nkey: { \na: 1\n}',
    ' - lol: true',
    '}',
  );
  expect(splitedOutputGendiffForYaml.length).toEqual(expectedLength);
});

test('output gendiff for ini format', () => {
  const collOfFixtureDataIni = getReadedFiles(getFixturePath('/before.ini'), getFixturePath('/after.ini'));
  const formatFixtureFilesIni = getFilesFormat(getFixturePath('/before.ini'), getFixturePath('/after.ini'));

  const splitedOutputGendiffForIni = genDiff(collOfFixtureDataIni, formatFixtureFilesIni).split('\n');
  expect(splitedOutputGendiffForIni).toContain(
    '{',
    ' + verbose: true',
    ' host: hexlet.io',
    ' + timeout: 20',
    ' - timeout: 50',
    ' - proxy: 123.234.53.22',
    ' - follow: false',
    ' + lol: {\nkey: { \na: 1\n}',
    ' - lol: true',
    '}',
  );
  expect(splitedOutputGendiffForIni.length).toEqual(expectedLength);
});
