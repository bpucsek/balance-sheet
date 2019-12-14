import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
  },
}));

function TableHead(props) {
  const classes = useStyles();

  // TODO: Show when loading

  return (
    <MuiTableHead className={classes.root}>
      <TableRow>
        <TableCell
          className={props.classes.cell}
        >
          {_i18n('model.Item.type')}
        </TableCell>
        <TableCell
          className={props.classes.cell}
        >
          {_i18n('model.Item.name')}
        </TableCell>
        <TableCell
          className={props.classes.cell}
          align={'right'}
        >
          {_i18n('model.Item.balance')}
        </TableCell>
      </TableRow>
    </MuiTableHead>
  );
}

TableHead.propTypes = {
  classes: PropTypes.exact({
    root: PropTypes.string,
    cell: PropTypes.string,
  }),
};

export default TableHead;
