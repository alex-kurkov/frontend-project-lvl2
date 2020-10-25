import fileParser from './fileParser.js';
import formatter from './formatters/index.js';

// returns array of siblings and their children nodes,
// in which every node is recursively set as an 'immutable' node
// (with corresponding props), having eiter its own immutable
// children or end 'leaf' with value prop.
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

// returns sorted unique keys
const getUniqueKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return keys2
    .reduce((acc, i) => ((acc.includes(i)) ? acc : [...acc, i]), [...keys1])
    .sort();
};
// simplified linter-friendly notation
const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
// is not 'null' Object check
const isRegularObject = (value) => value !== null && typeof value === 'object';
// mutated node add handler
const handleNodeAdd = (object1, object2, key, value1, value2, acc) => {
  const node = { name: key };
  if (hasKey(object1, key)) {
    node.type = 'removed';
    if (hasKey(object2, key)) {
      node.updated = true;
    }
    if (isRegularObject(value1)) {
      node.children = setImmutableChildrenNodes(value1);
    } else {
      node.value = value1;
    }
    acc.push(node);
  }

  if (hasKey(object2, key)) {
    const node2 = { name: key, type: 'added' };

    if (hasKey(object1, key)) {
      node2.updated = true;
      node2.updatedFrom = value1;
    }

    if (isRegularObject(value2)) {
      node2.children = setImmutableChildrenNodes(value2);
    } else {
      node2.value = value2;
    }
    acc.push(node2);
  }
};

// main comparer function returning tree-layout deep difference between 2 objects
const getDiff = (object1, object2) => {
  const uniqueKeys = getUniqueKeys(object1, object2);

  const diff = uniqueKeys.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    // immutable node handlers
    if (value1 === value2) return [...acc, { name: key, type: 'immuted', value: value1 }];
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      return [...acc, { name: key, type: 'immuted', children: getDiff(value1, value2) }];
    }
    // mutated node adder
    handleNodeAdd(object1, object2, key, value1, value2, acc);

    return acc;
  }, []);
  return diff;
};

export default (path1, path2, formatOutput = 'stylish') => {
  const obj1 = fileParser(path1);
  const obj2 = fileParser(path2);
  const result = getDiff(obj1, obj2);
  return formatter(result, formatOutput);
};
