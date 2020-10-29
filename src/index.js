import parseFile from './file-parser.js';
import formatData from './formatters/index.js';
import getDifference from './getDifference.js';

export default (path1, path2, formatOutput = 'stylish') => {
  const obj1 = parseFile(path1);
  const obj2 = parseFile(path2);
  const result = getDifference(obj1, obj2);
  return formatData(result, formatOutput);
};
