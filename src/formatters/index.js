import stylishStringify from './stylish.js';
import plainStringify from './plain.js';
import jsonStringify from './json.js';

export default (object, format) => {
  switch (format) {
    case 'json':
      return jsonStringify(object);
    case 'plain':
      return plainStringify(object);
    case 'stylish':
      return stylishStringify(object);
    default:
      return new Error('format not supported');
  }
};
