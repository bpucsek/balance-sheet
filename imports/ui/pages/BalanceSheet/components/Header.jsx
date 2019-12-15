import classNames from 'classnames';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import AddItemDialog from '/imports/ui/pages/BalanceSheet/components/AddItemDialog';

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
  const [dialogOpen, toggleDialog] = useState(false);

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
            toggleDialog(true);
          }}
        >
          {_i18n('component.Header.button.add-item')}
        </Button>
      </Toolbar>
      {dialogOpen && <AddItemDialog
        onClose={() => {
          toggleDialog(false);
        }}
      />}
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
