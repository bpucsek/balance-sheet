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
  convertCentsToDollars,
} from '/imports/api/items/utils';
import ManageItem from '/imports/ui/components/ManageItem';

const useStyles = makeStyles((theme) => ({
  content: {
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
  },
  removeButton: {
    margin: theme.spacing(2, 0),
  },
}));

function EditItemDialog({
  item,
  onClose,
}) {
  const classes = useStyles();
  const [balance, setBalance] = useState(convertCentsToDollars(item.balance).toString());
  const [errors, setErrors] = useState({});
  const [name, setName] = useState(item.name);
  const [type, setType] = useState(item.type);

  function handleRemoveItem() {
    Meteor.call('item.remove', { itemId: item._id }, (err) => {
      if (err) throw err;
      onClose();
    });
  }

  function handleEditItem() {
    let errs = validateItem({ name, balance });

    if (Object.keys(errs).length) {
      return setErrors(errs);
    }

    Meteor.call('item.edit', {
      itemId: item._id,
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
      onBackdropClick={onClose}
      maxWidth={'xs'}
      open
    >
      <DialogTitle
        disableTypography
      >
        <IconButton
          className={classes.closeButton}
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>
        <Typography
          color={'inherit'}
          variant={'h6'}
        >
          {_i18n('component.EditItemDialog.title')}
        </Typography>
      </DialogTitle>
      <DialogContent
        className={classes.content}
      >
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
        <Button
          className={classes.removeButton}
          color={'secondary'}
          onClick={handleRemoveItem}
          variant={'text'}
        >
          {_i18n('component.EditItemDialog.remove-item')}
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          color={'secondary'}
          onClick={handleEditItem}
          variant={'contained'}
        >
          {_i18n('base.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditItemDialog.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default EditItemDialog;
