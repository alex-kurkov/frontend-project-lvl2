const formatter2 = (object, format = 'stylish') => {
      return stringify(object, format);
}


const stringify = (value) => {
  const renderPrefix = '  ';

  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    if (currentValue === null) return 'null';
    
    const deepIndentSize = depth + 1;
    const deepIndent = renderPrefix.repeat(deepIndentSize);
    const currentIndent = renderPrefix.repeat(depth) + renderPrefix.repeat(depth);

    const lines = Object
    .entries(currentValue)
    .map(([key, val]) => {
      const keyArr = key.split(' ');
      const unprefixedKey = keyArr.pop();
      const prefixIndicator = keyArr.shift(); // may be '+','-' or ''
      let keyPrefixer = '';
      if (prefixIndicator !== '') {
        keyPrefixer = `${deepIndent.slice(0, -2)}${prefixIndicator} `;
      } else {
        keyPrefixer = deepIndent;
      }

      return `${deepIndent}${keyPrefixer}${unprefixedKey}: ${iter(val, deepIndentSize)}`
    });
    
    return [
      '{',
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  };
  
  return iter(value, 0);
};
export default formatter2;
