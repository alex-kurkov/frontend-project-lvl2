import fileParser from './fileParser.js';
import formatter from './formatter.js';

const uniq = (arr1, arr2) => arr1.reduce((acc, i) => {
  if (!acc.includes(i)) return [...acc, i];
  return acc;
}, [...arr2]);

export default (path1, path2, formatOutput = 'stylish') => {
  const obj1 = fileParser(path1);
  const obj2 = fileParser(path2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqueKeys = uniq(keys1, keys2);

  const result = uniqueKeys.reduce((acc, key) => {
    const bothHaveKey = `  ${key}`;
    const firstOnlyKey = `- ${key}`;
    const secondOnlyKey = `+ ${key}`;
    if (obj1[key] === obj2[key]) {
      acc[bothHaveKey] = obj1[key];
      return acc;
    }
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      acc[firstOnlyKey] = obj1[key];
    }
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      acc[secondOnlyKey] = obj2[key];
    }
    return acc;
    }, {});

    return formatter(result, formatOutput);
}
