const getType = (obj) => obj.type;
const getChildren = (obj) => obj.children;
const getValue = (obj) => obj.value;
const getName = (obj) => obj.name;
const isUpdated = (obj) => (obj.updated ? obj.updated : false);
const getPreviousValue = (obj) => obj.updatedFrom;

const switchMessage = (action, property, value1 = '', value2 = '') => {
  switch (action) {
    case 'remove':
      return `Property '${property}' was removed`;
    case 'add':
      return `Property '${property}' was added with value: ${value1}`;
    case 'update':
      return `Property '${property}' was updated. From ${value1} to ${value2}`;
    default:
      return new Error(`cannot form message with these props! action: ${action}, property: ${property}`);
  }
};
const stringifyValue = (value) => {
  switch (typeof value) {
    case 'object':
      if (value === null) return 'null';
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return `${value}`;
  }
};
const switchActionMethod = (type, children, updated) => {
  switch (type) {
    case 'immuted':
      return children ? 'goDeeper' : 'ignore';
    case 'removed':
      return updated ? '' : 'renderRemove';
    case 'added':
      return updated ? 'renderUpdate' : 'renderAdd';
    default:
      return new Error(`cannot return method of this type: ${type}`);
  }
};

const plain = (tree, path = '') => {
  const iter = (currentValue, currentPath) => {
    const type = getType(currentValue);
    const children = getChildren(currentValue);
    const updated = isUpdated(currentValue);
    const property = getName(currentValue);
    const currentPropertyPath = `${currentPath}${property}`;
    const value = getValue(currentValue);
    const previousValue = getPreviousValue(currentValue);
    const valueToRender = (children) || value;
    const actionMethod = switchActionMethod(type, children, updated);

    const generateMessage = () => {
      let message = '';
      switch (actionMethod) {
        case 'ignore':
          break;
        case 'goDeeper':
          message = plain(children, `${currentPropertyPath}.`);
          break;
        case 'renderRemove':
          message = switchMessage('remove', currentPropertyPath, stringifyValue(value));
          break;
        case 'renderUpdate':
          message = switchMessage('update', currentPropertyPath, stringifyValue(previousValue), stringifyValue(valueToRender));
          break;
        case 'renderAdd':
          message = switchMessage('add', currentPropertyPath, stringifyValue(valueToRender));
          break;
        default:
          return null;
      }
      return message;
    };
    return generateMessage(actionMethod);
  };
  const lines = tree.flatMap((i) => iter(i, path)).filter((i) => i);
  return lines.join('\n');
};

export default plain;
