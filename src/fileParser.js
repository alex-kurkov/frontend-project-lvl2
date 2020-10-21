import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export default (filePath) => {
  if (!filePath) return null;
  const format = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8')

  switch (format) {
    case '.yaml':
      return yaml.safeLoad(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.json':
      return JSON.parse(data);
    default:
      return new Error('file not supported');
  }
}
