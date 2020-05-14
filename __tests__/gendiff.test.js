import { test, expect } from '@jest/globals';
import genDiff from '../gendiff';
import { expected, dirPath1, dirPath2 } from '../fixtures/rightAnswer';
console.log(genDiff(dirPath1, dirPath2))
test('output gendiff', () => {
	expect(genDiff(dirPath1, dirPath2)).toBe(expected);
});