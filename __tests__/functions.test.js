import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';
import { readFile } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const rightOutputStylish = readFile(getFixturePath('./rightOutputStylish.txt'));
const rightOutputJson = readFile(getFixturePath('./rightOutputJson.txt'));
const rightOutputPlain = readFile(getFixturePath('./rightOutputPlain.txt'));

test.each([
  ['./before.json', './after.json'],
  ['./before.yaml', './after.yaml'],
  ['./before.ini', './after.ini'],
])('output gendiff for formatters', (path1, path2) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), 'stylish'))
    .toEqual(rightOutputStylish);
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), 'plain'))
    .toEqual(rightOutputPlain);
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), 'json'))
    .toEqual(rightOutputJson);
});
