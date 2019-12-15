import React from 'react';
import PropTypes from 'prop-types';

import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  body: {
    whiteSpace: 'pre-wrap',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
  },
}));

function HelpDialog({
  onClose,
}) {
  const classes = useStyles();

  return (
    <Dialog
      maxWidth={'sm'}
      onBackdropClick={onClose}
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
          variant={'h6'}
        >
          {_i18n('component.HelpDialog.title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          className={classes.body}
          variant={'body1'}
        >
          {_i18n('component.HelpDialog.body')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color={'secondary'}
          variant={'contained'}
          onClick={() => {
            window.open('https://facetwealth.com/get-started/', '_blank');
          }}
        >
          {_i18n('component.HelpDialog.link')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

HelpDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default HelpDialog;
