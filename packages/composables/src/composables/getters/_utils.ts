import { AgnosticAttribute } from '@vue-storefront/core';
import { Product, ConfigurableOption } from '@vue-storefront/magento-api';

export const getAttributeValue = (attribute) => attribute.values;

export const formatAttributeList = (attributes: ConfigurableOption[]): AgnosticAttribute[] => attributes.map((attr) => {
  const attrValue = getAttributeValue(attr);
  return {
    name: attr.attribute_code,
    value: attrValue,
    label: attr.label,
  };
});

export const getVariantByAttributes = (products: Product[], attributes: any): Product => {
  if (!products || products.length === 0) {
    return null;
  }

  const configurationKeys = Object.keys(attributes);

  return products[0].configurable_children.find((product) => configurationKeys
    .every((attrName) => product[attrName] && product[attrName] === attributes[attrName])) || products[0].configurable_children[0];
};
