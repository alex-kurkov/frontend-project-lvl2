import fs from 'fs';
import yaml from 'js-yaml';

export default (filePath) => {
  if (!filePath) return null;
  const data = fs.readFileSync(filePath, 'utf-8');

  try {
    return JSON.parse(data);
  } catch {
    return yaml.safeLoad(data);
  }
};
