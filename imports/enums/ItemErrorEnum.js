import { enumerateValues } from '/imports/modules/utils';

const map = {
  InvalidNumber: 'invalid-number',
  InvalidBalance: 'invalid-balance',
  BalanceTooHigh: 'balance-too-high',
  BalanceTooLow: 'balance-too-low',
  RequiredField: 'required-field',
};

const values = enumerateValues(map);

export { map, values };
