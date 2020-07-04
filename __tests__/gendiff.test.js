import { test, expect } from '@jest/globals';
import genDiff from '../gendiff';
import * as paths from '../fixtures/pathsToTestFiles';

const splitedOutputGendiffForJson = genDiff(paths.dirPath1ForJson, paths.dirPath2ForJson).split('\n');
const splitedOutputGendiffForYaml = genDiff(paths.dirPath1ForYaml, paths.dirPath2ForYaml).split('\n');
const splitedOutputGendiffForIni = genDiff(paths.dirPath1ForIni, paths.dirPath2ForIni).split('\n');

test('output gendiff for json format', () => {
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
