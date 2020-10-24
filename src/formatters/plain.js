const getType = (obj) => obj['type'];
const getChildren = (obj) => obj['children'];
const getValue = (obj) => obj['value'];
const getName = (obj) => obj['name'];
const isUpdated = (obj) => {
  return obj['updated'] ? obj['updated'] : false;
}
const getPreviousValue = (obj) => obj['updatedFrom'];

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

const plain = (tree, path = '') => {
  const iter = (currentValue, currentPath) => {
    const type = getType(currentValue);
    const children = getChildren(currentValue);
    const updated = isUpdated(currentValue);
    const property = getName(currentValue);
    const currentPropertyPath = `${currentPath}${property}`;
    const value = getValue(currentValue);
    const previousValue = getPreviousValue(currentValue);

    if (type === 'immuted' && !children) return;

    if (type === 'immuted' && children) {
      return plain(children, `${currentPropertyPath}.`)
    }

    if (type === 'removed' && !updated) {
      return generateMessage(
        'remove', 
        currentPropertyPath,
        stringifyValue(value));
    }
    if (type === 'added' && updated) {
      const valueToRender =  (children) ? children : value;
      return generateMessage(
        'update',
        currentPropertyPath,
        stringifyValue(previousValue),
        stringifyValue(valueToRender))
    } 
    if (type === 'added' && !updated) {
      const valueToRender =  (children) ? children : value;
      return generateMessage(
        'add',
        currentPropertyPath,
        stringifyValue(valueToRender))
    }
  }
  const lines = tree.flatMap((i) => iter(i, path)).filter((i) => i);
  return lines.join('\n');
}

export default plain;
