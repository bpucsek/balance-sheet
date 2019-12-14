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
  addButton: {},
  table: {},
  title: {
    flexGrow: 1,
    fontWeight: 600,
  },
}));

function Header({
  AppBarProps
}) {
  const classes = useStyles();
  const [dialogOpen, toggleDialog] = useState(false);

  return (
    <AppBar
      className={classes.root}
      color={'inherit'}
      elevation={0}
      { ...AppBarProps }
    >
      <Toolbar
        variant={'dense'}
      >
        <Typography
          className={classes.title}
          variant={'h5'}
        >
          {_i18n('component.Header.title')}
        </Typography>
        <Button
          className={classes.addButton}
          color={'secondary'}
          variant={'outlined'}
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
  AppBarProps: PropTypes.exact({
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    position: PropTypes.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
  }),
};

export default Header;
