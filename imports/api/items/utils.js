import { map as ItemErrorEnum } from '/imports/enums/ItemErrorEnum';

// These correctly convert '2222asdasdf' -> NaN. parseFloat will incorrectly convert that example to 2222
export const parseNumber = (str) => (str*1);
export const convertBalanceToCents = (str) => (str*100);
export const convertCentsToDollars = (v) => (v/100);

export const isValidCurrencyAmount = (str) => (((str*100).toFixed(2)*1)%1 === 0);

export const formatBalance = (cents) => {
  let amount = (Math.abs(cents)/100).toFixed(2);

  if (cents < 0) {
    return `(${amount})`;
  }

  return `${amount}`;
};

export const validateItem = ({ name, balance }) => {
  let errs = {};

  if (!name.length) {
    errs.name = ItemErrorEnum.RequiredField;
  }

  const balanceNumber = parseNumber(balance);

  if (!balance.length) {
    errs.balance = ItemErrorEnum.RequiredField;
  } else if (!isFinite(balanceNumber)) {
    errs.balance = ItemErrorEnum.InvalidNumber;
  } else if (!isValidCurrencyAmount(balance)) {
    errs.balance = ItemErrorEnum.InvalidBalance;
  }

  return errs;
};
