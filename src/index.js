import fileParser from './fileParser.js';
import formatter from './formatters/index.js';

// returns array of siblings and their children nodes, in which every node is recursively set as an 'immutable' node 
// (with corresponding props), having eiter its own immutable children or end 'leaf' with value prop.
const setImmutableChildrenNodes = (object) => {
  return Object
    .keys(object)
    .sort()
    .reduce((acc, key) => {
      const node = { name: key, type: 'immuted' };
      const value = object[key];
      
      if (typeof value === 'object' && value !== null) {
        node['children'] = setImmutableChildrenNodes(value);
        return [...acc, node];
      }
      return [...acc, {...node, value}];
    }, [])
};

// returns sorted unique keys
const uniq = (arr1, arr2) => arr2
  .reduce((acc, i) => {
    return (acc.includes(i)) ? acc : [...acc, i];
  }, [...arr1])
  .sort();

// main comparer function returning tree-layout deep difference between 2 objects 
const comparer = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const uniqueKeys = uniq(keys1, keys2);

  const diff = uniqueKeys.reduce((acc, key) => {
    const node = {};
    node['name'] = key;
    node['type'] = 'immuted' // default 'state'
    const value1 = object1[key];
    const value2 = object2[key];

    if (value1 === value2) { // covers "both-are-'null'" case
      node['value'] = value1;
      return [...acc, node];
    }

    if (typeof value1 === 'object' && typeof value2 === 'object' ) {
      node['children'] = [...comparer(value1, value2)];
        return [...acc, node];
    }
    if (Object.prototype.hasOwnProperty.call(object1, key)) {
      node['type'] = 'removed';

      if (value1 !== null && typeof value1 === 'object') {
          node[`children`] = setImmutableChildrenNodes(value1);
      } else {
          node['value'] = value1;
      }
      acc.push(node);
    }
    if (Object.prototype.hasOwnProperty.call(object2, key)) {
      const node2 = { name: key, type: 'added'};

      if (value1) node2['upgradedFrom'] = value1;

      if (value2 !== null && typeof value2 === 'object') {
          node2[`children`] = setImmutableChildrenNodes(value2);
      } else {
          node2['value'] = value2;
      }
      acc.push(node2);
    }
    return acc;
    }, []);

  return diff;
};

export default (path1, path2, formatOutput = 'stylish') => {
  const obj1 = fileParser(path1);
  const obj2 = fileParser(path2);
  const result = comparer(obj1, obj2);
  return formatter(result, formatOutput);
}
