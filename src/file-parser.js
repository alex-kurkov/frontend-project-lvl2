import yaml from 'js-yaml';

export default (data) => {
  try {
    return JSON.parse(data);
  } catch {
    console.log('json parsing failed, trying another parser');
  }
  try {
    return yaml.safeLoad(data);
  } catch {
    console.log('yaml parsing failed');
  }
  return new Error('cannot parse data');
};
