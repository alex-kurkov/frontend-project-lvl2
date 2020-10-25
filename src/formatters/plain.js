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
const actionMethodSwitcher = (type, children, updated) => {
  switch (type) {
    case 'immuted':
      return children ? 'goDeeper' : 'ignore';
    case 'removed':
      return updated ? '' : 'renderRemove';
    case 'added':
      return updated ? 'renderUpdate' : 'renderAdd';
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
    const valueToRender =  (children) ? children : value;
    const actionMethod = actionMethodSwitcher(type, children, updated);

    switch (actionMethod) {
      case 'ignore':
        break;
      case 'goDeeper':
        return plain(children, `${currentPropertyPath}.`);
      case 'renderRemove':
        return generateMessage('remove', currentPropertyPath, stringifyValue(value));
      case 'renderUpdate':
        return generateMessage('update', currentPropertyPath, stringifyValue(previousValue), stringifyValue(valueToRender))
      case 'renderAdd':
        return generateMessage('add', currentPropertyPath, stringifyValue(valueToRender))
    }
  }
  const lines = tree.flatMap((i) => iter(i, path)).filter((i) => i);
  return lines.join('\n');
}

export default plain;
