const prefixIndicators = { added: '+', removed: '-', immuted: ' ' };
const stylishPrefix = '  ';
const getType = (obj) => obj['type'];
const getChildren = (obj) => obj['children'];
const getValue = (obj) => obj['value'];
const getName = (obj) => obj['name'];

const  stylish = (arr, depth = 0) => {

  const deepIndentSize = depth + 1;
  const currentIndent = stylishPrefix.repeat(depth).repeat(2); // blank space before '}'
  
  const iter = (currentValue) => {

    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    if (currentValue === null) return 'null';

    const currentType = getType(currentValue);
    const property = getName(currentValue);
    const children = getChildren(currentValue);
    const value = (getValue(currentValue) !== undefined)
      ? getValue(currentValue)
      : stylish(children, deepIndentSize);

    // define indent blank space and indicacor strings
    const deepIndent = stylishPrefix.repeat(deepIndentSize);
    const prefixIndicator = prefixIndicators[currentType];
    const keyPrefixer = `${deepIndent.slice(0, -2)}${prefixIndicator} `;
        
    return `${deepIndent}${keyPrefixer}${property}: ${iter(value, deepIndentSize)}`;
    }

  const lines = arr.flatMap((i) => iter(i));

  return [
    '{',
    ...lines,
    `${currentIndent}}`
  ].join('\n');
}

export default stylish;
