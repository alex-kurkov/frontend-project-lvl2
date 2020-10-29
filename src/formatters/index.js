import stylishStringify from './stylish.js';
import plainStringify from './plain.js';
import jsonStringify from './json.js';

export default (tree, format) => {
  switch (format) {
    case 'json':
      return jsonStringify(tree);
    case 'plain':
      return plainStringify(tree);
    case 'stylish':
      return stylishStringify(tree);
    default:
      return new Error(`format ${format} not supported`);
  }
};
