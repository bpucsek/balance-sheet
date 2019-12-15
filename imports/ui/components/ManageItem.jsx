import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import { makeStyles, fade } from '@material-ui/core/styles';

import { map as ItemErrorEnum } from '/imports/enums/ItemErrorEnum';
import {
  map as ItemTypeEnum,
  values as ITEM_TYPES,
} from '/imports/enums/ItemTypeEnum';

const useStyles = makeStyles((theme) => ({
  typeButton: {},
  selected: {
    color: theme.palette.common.white,
    // TODO: Remove !important by fixing specificity
    backgroundColor: [fade(theme.palette.primary.main, 1.0), '!important'],
  },
  name: {
    marginTop: theme.spacing(4.5),
  },
  balance: {
    marginTop: theme.spacing(2),
  },
  spacing: {
    marginBottom: theme.spacing(2.5),
  },
}));

function ManageItem({
  balance,
  errors,
  name,
  type,
  setBalance,
  setErrors,
  setName,
  setType,
}) {
  const classes = useStyles();

  return (
    <div>
      <ButtonGroup fullWidth
        color={'primary'}
      >
        {ITEM_TYPES.map((v) => (
          <Button key={v}
            className={classNames(classes.typeButton, {
              [classes.selected]: v === type,
            })}
            onClick={() => (setType(v))}
          >
            {_i18n(`enum.ItemTypeEnum.${v}`)}
          </Button>
        ))}
      </ButtonGroup>
      <TextField fullWidth
        className={classNames(classes.name, {
          [classes.spacing]: !errors.name,
        })}
        error={!!errors.name}
        variant={'outlined'}
        label={_i18n('model.Item.name')}
        helperText={!!errors.name && _i18n(`err.${errors.name}`)}
        value={name}
        onChange={(evt) => {
          setErrors({ ...errors, name: null });
          setName(evt.target.value);
        }}
      />
      <TextField fullWidth
        className={classNames(classes.balance, {
          [classes.spacing]: !errors.balance,
        })}
        error={!!errors.balance}
        variant={'outlined'}
        label={_i18n('model.Item.balance')}
        helperText={!!errors.balance && _i18n(`err.${errors.balance}`)}
        value={balance}
        onChange={(evt) => {
          setErrors({ ...errors, balance: null });
          setBalance(evt.target.value);
        }}
      />
    </div>
  );
}

ManageItem.propTypes = {
  balance: PropTypes.string.isRequired,
  errors: PropTypes.exact({
    balance: PropTypes.oneOf([
      ItemErrorEnum.InvalidBalance,
      ItemErrorEnum.InvalidNumber,
      ItemErrorEnum.RequiredField,
    ]),
    name: PropTypes.oneOf([
      ItemErrorEnum.RequiredField,
    ]),
  }).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(ITEM_TYPES).isRequired,
  setBalance: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};

ManageItem.defaultProps = {
  balance: '',
  errors: [],
  name: '',
  type: ItemTypeEnum.Asset,
};

export default ManageItem;
