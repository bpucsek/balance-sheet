import classNames from 'classnames';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/HelpOutline';

import AddItemDialog from '/imports/ui/components/AddItemDialog';
import HelpDialog from '/imports/ui/components/HelpDialog';

const useStyles = makeStyles(() => ({
  root: {},
  toolbar: {},
  table: {},
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  const [addItemOpen, toggleAddItemDialog] = useState(false);
  const [helpOpen, toggleHelpDialog] = useState(false);

  return (
    <AppBar
      className={classNames(classes.root, props.classes.root)}
      color={'primary'}
      position={'fixed'}
      elevation={0}
    >
      <Toolbar
        variant={'dense'}
        className={classNames(classes.toolbar, props.classes.toolbar)}
      >
        <Typography
          className={classes.title}
          variant={'h5'}
        >
          {_i18n('component.Header.title')}
        </Typography>
        <Button
          color={'secondary'}
          variant={'contained'}
          onClick={() => {
            toggleAddItemDialog(true);
          }}
        >
          {_i18n('component.Header.button.add-item')}
        </Button>
        <IconButton
          color={'inherit'}
          onClick={() => {
            toggleHelpDialog(true);
          }}
        >
          <HelpIcon />
        </IconButton>
      </Toolbar>
      {addItemOpen &&
        <AddItemDialog
          onClose={() => {
            toggleAddItemDialog(false);
          }}
        />
      }
      {helpOpen &&
        <HelpDialog
          onClose={() => {
            toggleHelpDialog(false);
          }}
        />
      }
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.exact({
    root: PropTypes.string,
    toolbar: PropTypes.string,
  }),
};

export default Header;
