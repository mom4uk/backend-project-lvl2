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
  ['./before.json', './after.json', 'stylish'],
  ['./before.yaml', './after.yaml', 'stylish'],
  ['./before.ini', './after.ini', 'stylish'],
])('output gendiff for stylish formatter', (path1, path2, formatName) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), formatName))
    .toEqual(rightOutputStylish);
});

test.each([
  ['./before.json', './after.json', 'plain'],
  ['./before.yaml', './after.yaml', 'plain'],
  ['./before.ini', './after.ini', 'plain'],
])('output gendiff for plain formatter', (path1, path2, formatName) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), formatName))
    .toEqual(rightOutputPlain);
});

test.each([
  ['./before.json', './after.json', 'json'],
  ['./before.yaml', './after.yaml', 'json'],
  ['./before.ini', './after.ini', 'json'],
])('output gendiff for json formatter', (path1, path2, formatName) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), formatName))
    .toEqual(rightOutputJson);
});
