const generateMessage = (action, property, value1 = '', value2 = '') => {
  switch (action) {
    case 'remove':
      return `Property '${property}' was removed`;
    case 'add':
      return `Property '${property}' was added with value: ${value1}`;
    case 'update':
      return `Property '${property}' was updated. From ${value1} to ${value2}`;
  }
}
const stringifyValue = (value) => {
  switch (typeof value) {
    case 'object':
      if (value === null) return `null`
      return `[complex value]`;
    case 'string':
      return `'${value}'`;
    default:
      return `${value}`;
  }
}
const plain = (object) => {

  const iter = (currentValue, currentPath) => {
    const lines = Object
      .entries(currentValue)
      .reduce((acc, item, index, arr) => {
        const [key, currentValue] = item;
        const [nextKey, nextValue] = arr[index + 1] ? arr[index + 1] : [];
        const previousKey = arr[index - 1] ? arr[index - 1].shift() : null;
        const keyArr = key.split(' ');
        const property = keyArr.pop();
        const currentPropertyPath = `${currentPath}${property}`;
        const prefixIndicator = keyArr.shift(); // may be '+','-' or undefined
        const isComplexCurrentValue = typeof currentValue === 'object' && currentValue !== null;

        if (!prefixIndicator && !isComplexCurrentValue) return acc;
        if (!prefixIndicator && isComplexCurrentValue) {
          return [...acc, ...iter(currentValue, `${currentPropertyPath}.`)];
        }
        if (prefixIndicator === '-') {
          const message = nextKey !== `+ ${property}`
            ? generateMessage('remove', currentPropertyPath, stringifyValue(currentValue))
            : generateMessage('update', currentPropertyPath, stringifyValue(currentValue), stringifyValue(nextValue))
          return [...acc, message];
        }
        if (prefixIndicator === '+' && previousKey !== `- ${property}`) {
          return [...acc, generateMessage('add', currentPropertyPath, stringifyValue(currentValue))]
        }
        return acc;
      }, [])
    return lines;
  } 
  return iter(object, '').join('\n');
}

export default plain;
/* Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value] */
