import stylishStringify from './stylish.js';
import plainStringify from './plain.js'

export default (object, format = 'stylish') => {
  switch (format) {
    case 'json':
      return JSON.stringify(object, null, '  ');
    case 'plain':
      return plainStringify(object);
    default:
      return stylishStringify(object);
    }
}
