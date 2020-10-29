import _ from 'lodash';

const prefixIndicators = { added: '+ ', removed: '- ', immuted: '' };

function generateObject(tree) {
  const object = {};
  tree.forEach((node) => {
    const {
      name, type, children, value,
    } = node;
    const prefixIndicator = prefixIndicators[type];
    const calculatedName = `${prefixIndicator}${name}`;
    const calculatedValue = _.hasIn(node, 'value')
      ? value : generateObject(children);
    object[calculatedName] = calculatedValue;
  });
  return object;
}
const json = (tree) => JSON.stringify(generateObject(tree));

export default json;
