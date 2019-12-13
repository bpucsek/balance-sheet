import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles, fade } from '@material-ui/core/styles';

import {
  map as ItemTypeEnum,
  values as ITEM_TYPES
} from '/imports/enums/ItemTypeEnum';

const styles = (theme) => ({
  root: {},
  paper: {},
  title: {},
  typeButton: {},
  selected: {
    color: theme.palette.common.white,
    backgroundColor: [fade(theme.palette.primary.main, 1.0), '!important']
  },
  name: {
    marginTop: theme.spacing(2)
  },
  balance: {
    marginTop: theme.spacing(2)
  },
  actions: {},
  cancelButton: {}
});

function AddItemDialog({ classes, open, onClose }) {
  const [balance, setBalance] = useState('');
  const [errors, setErrors] = useState({});
  const [name, setText] = useState('');
  const [type, setType] = useState(ItemTypeEnum.Asset);

  function validate() {
    let errs = {};

    if (!name.length) {
      errs.name = 'REQUIRED_FIELD';
    }

    if (!balance.length) {
      errs.balance = 'REQUIRED_FIELD';
    } else if (!isFinite(parseInt(balance))) {
      errs.balance = 'INVALID_BALANCE';
    }

    return errs;
  }

  function handleCreate() {
    let errs = validate();

    if (Object.keys(errs).length) {
      return setErrors(errs);
    }

    Meteor.call('item.add', {
      type,
      name,
      balance: parseInt(balance)
    }, (err) => {
      if (err) throw err;
      onClose();
    });
  }

  return (
    <Dialog
      className={classes.root}
      classes={{ paper: classes.paper }}
      open={open}
      onBackdropClick={onClose}
      maxWidth={'sm'}
    >
      <DialogTitle
        disableTypography
        className={classes.title}
      >
        <Typography variant='h6' color='inherit'>
          {_i18n('component.AddItemDialog.title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <ButtonGroup fullWidth
          color={'primary'}
        >
          {ITEM_TYPES.map((v) => (
            <Button key={v}
              className={classNames(classes.typeButton, {
                [classes.selected]: v === type
              })}
              onClick={() => (setType(v))}
            >
              {_i18n(`enum.ItemTypeEnum.${v}`)}
            </Button>
          ))}
        </ButtonGroup>
        <TextField fullWidth
          className={classes.name}
          error={!!errors.name}
          variant={'outlined'}
          label={_i18n('model.Item.name')}
          helperText={!!errors.name && _i18n(`component.AddItemDialog.err.${errors.name}`)}
          value={name}
          onChange={(evt) => {
            setErrors({ ...errors, name: null });
            setText(evt.target.value)
          }}
        />
        <TextField fullWidth
          className={classes.balance}
          error={!!errors.balance}
          variant={'outlined'}
          label={_i18n('component.AddItemDialog.field.balance')}
          helperText={!!errors.balance && _i18n(`component.AddItemDialog.err.${errors.balance}`)}
          value={balance}
          onChange={(evt) => {
            setErrors({ ...errors, balance: null });
            setBalance(evt.target.value)
          }}
        />
      </DialogContent>
      <DialogActions
        className={classes.actions}
      >
        <Button
          className={classes.cancelButton}
          variant='text'
          onClick={onClose}
        >
          {_i18n('base.cancel')}
        </Button>
        <Button

          className={classes.createButton}
          variant='text'
          onClick={handleCreate}
        >
          {_i18n('base.add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddItemDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AddItemDialog);
