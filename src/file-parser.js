import yaml from 'js-yaml';

export default (data) => {
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
