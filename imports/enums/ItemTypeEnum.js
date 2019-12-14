import { enumerateValues } from '/imports/modules/Utils';

const map = {
  Asset: 'Asset',
  Liability: 'Liability',
};

const values = enumerateValues(map);

export { map, values };
