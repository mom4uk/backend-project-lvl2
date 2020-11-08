import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const rightOutputStylish = fs.readFileSync(getFixturePath('./rightOutputStylish.txt'), 'utf8');
const rightOutputJson = fs.readFileSync(getFixturePath('./rightOutputJson.txt'), 'utf8');
const rightOutputPlain = fs.readFileSync(getFixturePath('./rightOutputPlain.txt'), 'utf8');
const rightOutputJsonForIniParser = fs.readFileSync(getFixturePath('./rightOutputJsonForIniParser.txt'), 'utf8');

test.each([
  ['./before.json', './after.json', 'stylish'],
  ['./before.yaml', './after.yaml', 'stylish'],
  ['./before.ini', './after.ini', 'stylish'],
  ])('output gendiff for stylish formatter', (path1, path2, formatName) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), formatName)).toEqual(rightOutputStylish);
});

test.each([
  ['./before.json', './after.json', 'plain'],
  ['./before.yaml', './after.yaml', 'plain'],
  ['./before.ini', './after.ini', 'plain'],
  ])('output gendiff for plain formatter', (path1, path2, formatName) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), formatName)).toEqual(rightOutputPlain);
});

test.each([
  ['./before.json', './after.json', 'json'],
  ['./before.yaml', './after.yaml', 'json'],
  ])('output gendiff for json formatter', (path1, path2, formatName) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), formatName)).toEqual(rightOutputJson);
});

test('output for ini pareser, json formatter', () => {
  expect(genDiff(getFixturePath('./before.ini'), getFixturePath('./after.ini'), 'json')).toEqual(rightOutputJsonForIniParser);
})
