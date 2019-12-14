import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Header from '/imports/ui/pages/BalanceSheet/components/Header';
import MobileFooter from '/imports/ui/pages/BalanceSheet/components/MobileFooter';
import Table from '/imports/ui/pages/BalanceSheet/components/Table';

const useStyles = makeStyles(() => ({
  root: {},
  header: {},
  tableRoot: {
    marginTop: '48px', // 48px for AppBar
  },
  tableHeadCell: {
    top: '48px', // Height of AppBar
  },
}));

function Mobile(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header
        classes={{ root: classes.header }}
        AppBarProps={{
          position: 'fixed',
        }}
      />
      <Table { ...props }
        classes={{
          root: classes.tableRoot,
        }}
        TableHeadProps={{
          classes: {
            cell: classes.tableHeadCell,
          },
        }}
      />
      <MobileFooter />
    </div>
  );
}

export default Mobile;
