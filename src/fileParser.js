import fs from 'fs';

export default (path, format = 'json') => {
 const file = fs.readFileSync(path);

  switch (format) {
    case 'json':
      return JSON.parse(file);
    default:
      return file
  }
}
