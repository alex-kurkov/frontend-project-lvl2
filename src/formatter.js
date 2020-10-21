const formatter = (object, format) => {
  switch (format) {
    case 'json':
      return JSON.stringify(object, null, ' ');
    default:
      return customStringify(object, format);
    }
}
// results in plain String unless format set as 'stylish'
const customStringify = (obj, format = 'text') => {
  const iter = (object, format, times) => {
    const entries = Object.entries(object);
    const stylishPrefix = (format === 'stylish') && '  '.repeat(times);
    const lines = entries
      .map(([key, value]) => {
        const newValue = (typeof value === 'object')
          ? iter(value, format, times += 2)
          : value;
        return `${stylishPrefix || ''}${key}: ${newValue}`;
      })
  const outputString = `{\n${lines.join('\n')}\n}`;
  return outputString;
  };
  return iter(obj, format, 2);
};

export default formatter;
