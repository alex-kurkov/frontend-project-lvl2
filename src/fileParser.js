import fs from 'fs';

export default (path, inputFormat) => {
  if (!path) return null;
  const data = fs.readFileSync(path, 'utf-8')

  switch (inputFormat) {
    case 'yml':
      return;
    default:
      return JSON.parse(data);
  }
}
