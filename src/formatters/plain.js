export default (value) => {
  const renderPrefix = ' ';

  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    if (currentValue === null) return 'null';
    
    const deepIndentSize = depth + 1;
    const deepIndent = renderPrefix.repeat(deepIndentSize);
    const currentIndent = renderPrefix.repeat(depth);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${deepIndent}${key}: ${iter(val, deepIndentSize)}`);
    
    return [
      '{',
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  };
  
  return iter(value, 0);
};
