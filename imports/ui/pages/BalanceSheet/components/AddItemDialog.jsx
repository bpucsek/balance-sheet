import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {
  validateItem,
  convertBalanceToCents,
} from '/imports/api/items/utils';
import { map as ItemTypeEnum } from '/imports/enums/ItemTypeEnum';
import ManageItem from '/imports/ui/pages/BalanceSheet/components/ManageItem';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {},
  title: {},
  actions: {},
  closeButton: {
    position: 'absolute',
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
  },
}));

function AddItemDialog({
  onClose
}) {
  const classes = useStyles();
  const [balance, setBalance] = useState('');
  const [errors, setErrors] = useState({});
  const [name, setName] = useState('');
  const [type, setType] = useState(ItemTypeEnum.Asset);

  function handleCreate() {
    let errs = validateItem({ name, balance });

    if (Object.keys(errs).length) {
      return setErrors(errs);
    }

    Meteor.call('item.add', {
      type,
      name,
      balance: convertBalanceToCents(balance),
    }, (err) => {
      if (err) throw err;
      onClose();
    });
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      className={classes.root}
      maxWidth={'xs'}
      onBackdropClick={onClose}
      open
    >
      <DialogTitle
        className={classes.title}
        disableTypography
      >
        <IconButton
          className={classes.closeButton}
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>
        <Typography
          variant={'h6'}
        >
          {_i18n('component.AddItemDialog.title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <ManageItem
          balance={balance}
          errors={errors}
          name={name}
          setBalance={setBalance}
          setErrors={setErrors}
          setName={setName}
          setType={setType}
          type={type}
        />
      </DialogContent>
      <DialogActions
        className={classes.actions}
      >
        <Button
          className={classes.createButton}
          color={'secondary'}
          onClick={handleCreate}
          variant={'contained'}
        >
          {_i18n('base.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddItemDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddItemDialog;
