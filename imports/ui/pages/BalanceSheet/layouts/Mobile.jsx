import React, { useState } from 'react';

import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import AddItemDialog from '/imports/ui/pages/BalanceSheet/components/AddItemDialog';
import Table from '/imports/ui/pages/BalanceSheet/components/Table';

const useStyles = makeStyles((theme) => ({
  root: {},
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

function Mobile(props) {
  const classes = useStyles();
  const [dialogOpen, toggleDialog] = useState(false);

  return (
    <div className={classes.root}>
      <Table { ...props } />
      <Fab
        className={classes.fab}
        color={'secondary'}
        onClick={() => {
          toggleDialog(true);
        }}
      >
        <AddIcon />
      </Fab>
      {dialogOpen && <AddItemDialog
        onClose={() => {
          toggleDialog(false);
        }}
      />}
    </div>
  );
}

export default Mobile;
