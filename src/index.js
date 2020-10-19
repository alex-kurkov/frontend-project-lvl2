export default (obj1, obj2, format) => {
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

  switch (format) {
    case 'text':
      return stringify(result);
    case 'json':
      return JSON.stringify(result);
    default:
      return result;
  }
}

const stringify = (object) => {
  const entries = Object.entries(object);
  const outputString = `{\n${entries.map(entry => {
    const [key, value] = entry;
    return `${key}: ${value}`;
  }).join('\n')}\n}`;
  return outputString;
}
