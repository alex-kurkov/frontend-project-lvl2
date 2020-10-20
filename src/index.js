import fileParser from './fileParser.js';

export default (path1, path2, formatOutput = 'text') => {
  const obj1 = fileParser(path1, 'json');
  const obj2 = fileParser(path2, 'json');
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqueKeys = keys2.reduce((acc, i) => {
    if (!acc.includes(i)) return [...acc, i];
    return acc;
  }, [...keys1]);

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

  switch (formatOutput) {
    case 'json':
      return JSON.stringify(result, null, ' ');
    default:
      return customStringify(result);
  }
}

const customStringify = (object) => {
  const entries = Object.entries(object);
  const lines = entries
    .map(([key, value]) => `${key}: ${value}`)
  const outputString = `{\n${lines.join('\n')}\n}`;
  return outputString;
}
