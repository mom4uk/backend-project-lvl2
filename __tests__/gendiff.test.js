import { test, expect } from '@jest/globals';
import genDiff from '../gendiff';
import * as rightAnswer from '../fixtures/rightAnswer';

test('output gendiff for json format', () => {
  expect(genDiff(rightAnswer.dirPath1ForJson, rightAnswer.dirPath2ForJson))
    .toBe(rightAnswer.expected);
});

test('output gendiff for yaml format', () => {
  expect(genDiff(rightAnswer.dirPath1ForYaml, rightAnswer.dirPath2ForYaml))
    .toBe(rightAnswer.expected);
});

test('output gendiff for ini format', () => {
  expect(genDiff(rightAnswer.dirPath1ForIni, rightAnswer.dirPath2ForIni))
    .toBe(rightAnswer.expected);
});
