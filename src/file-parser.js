import fs from 'fs';
import yaml from 'js-yaml';

export default (filePath) => {
  if (!filePath) return new Error('no file provided');
  const data = fs.readFileSync(filePath, 'utf-8');

  try {
    return JSON.parse(data);
  } catch {
    console.log('json parsing faild, trying another parser');
  }
  try {
    return yaml.safeLoad(data);
  } catch {
    console.log('yaml parsing faild');
  }
  return new Error('cannot read file');
};
