import { enumerateValues } from '/imports/modules/utils';

const map = {
  Asset: 'asset',
  Liability: 'liability',
};

const values = enumerateValues(map);

export { map, values };
