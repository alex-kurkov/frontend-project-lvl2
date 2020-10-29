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
  const iter = (object, currentPath) => {
    const {
      type, children, updated, name, value, updatedFrom,
    } = object;

    const currentPropertyPath = `${currentPath}${name}`;
    const previousValue = updatedFrom;
    const currentValue = children || value;
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
          message = switchMessage('update', currentPropertyPath, stringifyValue(previousValue), stringifyValue(currentValue));
          break;
        case 'renderAdd':
          message = switchMessage('add', currentPropertyPath, stringifyValue(currentValue));
          break;
        default:
          return null;
      }
      return message;
    };
    return generateMessage(actionMethod);
  };
  const lines = tree
    .flatMap((i) => iter(i, path))
    .filter((i) => i);
  return lines.join('\n');
};

export default plain;
