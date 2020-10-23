import fileParser from './fileParser.js';
import formatter from './formatters/index.js';

const uniq = (arr1, arr2) => arr2
  .reduce((acc, i) => {
    if (!acc.includes(i)) return [...acc, i];
    return acc;
  }, [...arr1])
  .sort();

const comparer = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const uniqueKeys = uniq(keys1, keys2);

  const compared = uniqueKeys.reduce((acc, key) => {
    const bothHaveKey = key;
    const firstOnlyKey = `- ${key}`;
    const secondOnlyKey = `+ ${key}`;
    const value1 = object1[key];
    const value2 = object2[key];

    if (value1 === value2) {
      acc[bothHaveKey] = value1;
      return acc;
    }
    if (typeof value1 === 'object' && typeof value2 === 'object') {
        acc[bothHaveKey] = comparer(value1, value2);
        return acc;
    }
    if (Object.prototype.hasOwnProperty.call(object1, key)) {
      acc[firstOnlyKey] = value1;
    }
    if (Object.prototype.hasOwnProperty.call(object2, key)) {
      acc[secondOnlyKey] = value2;
    }
    return acc;
    }, {});
  return compared;
};

export default (path1, path2, formatOutput = 'stylish') => {
  const obj1 = fileParser(path1);
  const obj2 = fileParser(path2);
  const result = comparer(obj1, obj2);
  return formatter(result, formatOutput);
}
