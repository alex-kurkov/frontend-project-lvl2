import stylishStringify from './stylish.js';
import plainStringify from './plain.js';
import jsonStringify from './json.js';

export default (object, format = 'stylish') => {
  switch (format) {
    case 'json':
      return jsonStringify(object);
    case 'plain':
      return plainStringify(object);
    default:
      return stylishStringify(object);
  }
};
