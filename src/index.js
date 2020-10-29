import fs from 'fs';
import parseFile from './file-parser.js';
import formatData from './formatters/index.js';
import getDifference from './getDifference.js';

export default (path1, path2, formatOutput = 'stylish') => {
  const obj1 = parseFile(fs.readFileSync(path1, 'utf-8'));
  const obj2 = parseFile(fs.readFileSync(path2, 'utf-8'));
  const result = getDifference(obj1, obj2);
  return formatData(result, formatOutput);
};
