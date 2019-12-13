import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import AddItemDialog from '/imports/ui/pages/BalanceSheet/components/AddItemDialog';
import TableBody from '/imports/ui/pages/BalanceSheet/components/TableBody';

const useStyles = makeStyles(theme => ({
  root: {},
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    margin: theme.spacing(1),
  }
}));

export default function(props) {
  const classes = useStyles();
  const [dialogOpen, toggleDialog] = useState(true);

  return (
    <div className={classes.root}>
      <TableBody { ...props } />
      <Fab className={classes.fab}
        onClick={() => { toggleDialog(true); }}
      >
        <AddIcon />
      </Fab>
      <AddItemDialog
        open={dialogOpen}
        onClose={() => { toggleDialog(false); }}
      />
    </div>
  );
}
