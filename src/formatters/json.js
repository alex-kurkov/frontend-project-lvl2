const prefixIndicators = { added: '+ ', removed: '- ', immuted: '' };
const getType = (obj) => obj['type'];
const getChildren = (obj) => obj['children'];
const getValue = (obj) => obj['value'];
const getName = (obj) => obj['name'];

const stringifyValue = (value) => {
  switch (typeof value) {
    case 'string':
      return `"${value}"`;
    default:
      return value;
  }
}

const  json = (arr) => {

  const iter = (currentValue) => {
    if (currentValue === '') return '""'; // empty string handle
    if (currentValue === null) return `"null"`;
    if (Array.isArray(currentValue)) return json(currentValue);
    if (typeof currentValue !== 'object') {
      return stringifyValue(currentValue);
    }

    const currentType = getType(currentValue);
    const prefixIndicator = prefixIndicators[currentType];
    const property = getName(currentValue);
    const children = getChildren(currentValue);
    const value = (getValue(currentValue) !== undefined)
      ? getValue(currentValue)
      : children;

    return `"${prefixIndicator}${property}":${iter(value)}`;
    }

  const lines = arr.flatMap(iter);
  return `{${[...lines].join(',')}}`;
}

export default json;
