export default (value, renderPrefix = '  ') => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    if (currentValue === null) return 'null';

    const deepIndentSize = depth + 1;
    const deepIndent = renderPrefix.repeat(deepIndentSize);
    const currentIndent = renderPrefix.repeat(depth) + renderPrefix.repeat(depth);
    
    if (Array.isArray(currentValue)) {
      const lines = currentValue
        .flatMap((val) => {
          if (typeof val !== 'object' || value === null) {
            return `${deepIndent.repeat(2)}${val}`
          }
          return `${deepIndent.repeat(2)}${iter(val, deepIndentSize)}`;
        })
      return [
        '[',
        ...lines,
        `${currentIndent}]`,
      ].join('\n');
    }

    const lines = Object
    .entries(currentValue)
    .map(([key, val]) => {
      const keyArr = key.split(' ');
      const unprefixedKey = keyArr.pop();
      const prefixIndicator = keyArr.shift(); // may be '+','-' or undefined
      const keyPrefixer = (prefixIndicator !== undefined)
        ? `${deepIndent.slice(0, -2)}${prefixIndicator} `
        : deepIndent;

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
