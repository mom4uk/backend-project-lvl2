import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';
import
{
  rightOutputStylish,
  rightOutputJson,
  rightOutputPlain,
  rightOutputJsonForIniParser,
} from '../__fixtures__/rightOutputs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const formatterStylish = 'stylish';
const formatterPlain = 'plain';
const formatterJson = 'json';


const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('output gendiff for stylish formatter', () => {
  const outputGendiffForJson = genDiff(getFixturePath('./before.json'), getFixturePath('./after.json'), formatterStylish);
  expect(outputGendiffForJson).toEqual(rightOutputStylish);

  const outputGendiffForYaml = genDiff(getFixturePath('./before.yaml'), getFixturePath('./after.yaml'), formatterStylish);
  expect(outputGendiffForYaml).toEqual(rightOutputStylish);

  const outputGendiffForIni = genDiff(getFixturePath('./before.ini'), getFixturePath('./after.ini'), formatterStylish);
  expect(outputGendiffForIni).toEqual(rightOutputStylish);
});

test('output gendiff for plain formatter', () => {
  const outputGendiffForJson = genDiff(getFixturePath('./before.json'), getFixturePath('./after.json'), formatterPlain);
  expect(outputGendiffForJson).toEqual(rightOutputPlain);

  const outputGendiffForYaml = genDiff(getFixturePath('./before.yaml'), getFixturePath('./after.yaml'), formatterPlain);
  expect(outputGendiffForYaml).toEqual(rightOutputPlain);

  const outputGendiffForIni = genDiff(getFixturePath('./before.ini'), getFixturePath('./after.ini'), formatterPlain);
  expect(outputGendiffForIni).toEqual(rightOutputPlain);
});

test('output gendiff for json formatter', () => {
  const outputGendiffForJson = genDiff(getFixturePath('./before.json'), getFixturePath('./after.json'), formatterJson);
  expect(outputGendiffForJson).toEqual(rightOutputJson);

  const outputGendiffForYaml = genDiff(getFixturePath('./before.yaml'), getFixturePath('./after.yaml'), formatterJson);
  expect(outputGendiffForYaml).toEqual(rightOutputJson);

  const outputGendiffForIni = genDiff(getFixturePath('./before.ini'), getFixturePath('./after.ini'), formatterJson);
  expect(outputGendiffForIni).toEqual(rightOutputJsonForIniParser);
});
