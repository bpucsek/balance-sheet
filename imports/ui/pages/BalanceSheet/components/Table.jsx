import React from 'react';

import MuiTable from '@material-ui/core/Table';

import { makeStyles } from '@material-ui/core/styles';

import TableBody from '/imports/ui/pages/BalanceSheet/components/TableBody';

const useStyles = makeStyles(() => ({
  root: {},
}));

function Table(props) {
  const classes = useStyles();

  return (
    <MuiTable className={classes.root}>
      <TableBody { ...props } />
    </MuiTable>
  );
}

export default Table;
