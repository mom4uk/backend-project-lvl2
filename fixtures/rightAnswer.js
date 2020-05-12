import dirname from 'path';

const path = require('path');
const dirPath1 = path.join(dirname, '/before.json');
const dirPath2 = path.join(dirname, '/after.json');

const expected = '{\n + verbose: true\n host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123.234.53.22\n - follow: false\n}';

export default { expected, dirPath1, dirPath2 };