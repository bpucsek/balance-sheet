import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import MuiTable from '@material-ui/core/Table';

import { makeStyles } from '@material-ui/core/styles';

import TableBody from '/imports/ui/pages/BalanceSheet/components/TableBody';
import TableHead from '/imports/ui/pages/BalanceSheet/components/TableHead';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  head: {},
  body: {},
}));

function Table({
  TableHeadProps,
  ...rest
}) {
  const classes = useStyles();

  return (
    <MuiTable
      className={classNames(classes.root, rest.classes.root)}
      stickyHeader
    >
      <TableHead { ...rest }
        { ...TableHeadProps }
      />
      <TableBody { ...rest } />
    </MuiTable>
  );
}

Table.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  TableHeadProps: PropTypes.object,
};

export default Table;
