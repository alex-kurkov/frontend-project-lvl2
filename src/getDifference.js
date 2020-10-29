import _ from 'lodash';

const setImmutableChildrenNodes = (object) => Object
  .entries(object)
  .reduce((acc, [key, value]) => {
    const node = { name: key, type: 'immuted' };
    if (typeof value === 'object' && value !== null) {
      node.children = setImmutableChildrenNodes(value);
      return [...acc, node];
    }
    return [...acc, { ...node, value }];
  }, []);

const isRegularObject = (value) => value !== null && typeof value === 'object';

const handleNodeAdd = (object1, object2, key, value1, value2) => {
  const nodes = [];
  if (_.hasIn(object1, key)) {
    const node = { name: key, type: 'removed' };
    if (_.hasIn(object2, key)) {
      node.updated = true;
    }
    if (isRegularObject(value1)) {
      node.children = setImmutableChildrenNodes(value1);
    } else {
      node.value = value1;
    }
    nodes.push(node);
  }
  if (_.hasIn(object2, key)) {
    const node2 = { name: key, type: 'added' };
    if (_.hasIn(object1, key)) {
      node2.updated = true;
      node2.updatedFrom = value1;
    }
    if (isRegularObject(value2)) {
      node2.children = setImmutableChildrenNodes(value2);
    } else {
      node2.value = value2;
    }
    nodes.push(node2);
  }
  return nodes;
};

const getDiff = (object1, object2) => {
  const diff = _.uniq([..._.keys(object1), ..._.keys(object2)])
    .sort()
    .flatMap((key) => {
      const value1 = object1[key];
      const value2 = object2[key];
      if (value1 === value2) return { name: key, type: 'immuted', value: value1 };
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        return { name: key, type: 'immuted', children: getDiff(value1, value2) };
      }
      return handleNodeAdd(object1, object2, key, value1, value2);
    });
  return diff;
};

export default getDiff;
