import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));

function TableHead() {
  const classes = useStyles();

  // TODO: Show when loading

  return (
    <MuiTableHead className={classes.root}>
      <TableRow>
        <TableCell>{_i18n('model.Item.type')}</TableCell>
        <TableCell>{_i18n('model.Item.name')}</TableCell>
        <TableCell align={'right'}>{_i18n('model.Item.balance')}</TableCell>
      </TableRow>
    </MuiTableHead>
  );
}

TableHead.propTypes = {
  // keep around we'll have props shortly
};

export default TableHead;
