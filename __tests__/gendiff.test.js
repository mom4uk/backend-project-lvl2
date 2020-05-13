import { test, expect } from '@jest/globals';
import genDiff from '../gendiff';
import { expected, dirPath1, dirPath2 } from '../fixtures/rightAnswer';


test('output gendiff', () => {
	expect(genDiff(dirPath1, dirPath2).toBe(expected));
});