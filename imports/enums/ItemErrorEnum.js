import { enumerateValues } from '/imports/modules/utils';

const map = {
  InvalidNumber: 'invalid-number',
  InvalidBalance: 'invalid-balance',
  RequiredField: 'required-field',
};

const values = enumerateValues(map);

export { map, values };
