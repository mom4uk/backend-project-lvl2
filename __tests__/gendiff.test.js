import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('output gendiff for json format', () => {
  const splitedOutputGendiffForJson = genDiff(getFixturePath('/before.json'), getFixturePath('/after.json')).split('\n');
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
});

test('output gendiff for yaml format', () => {
  const splitedOutputGendiffForYaml = genDiff(getFixturePath('/before.yaml'), getFixturePath('/after.yaml')).split('\n');
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
});

test('output gendiff for ini format', () => {
  const splitedOutputGendiffForIni = genDiff(getFixturePath('/before.ini'), getFixturePath('/after.ini')).split('\n');
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
});
