import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Header from '/imports/ui/components/Header';
import MobileFooter from '/imports/ui/components/MobileFooter';
import Table from '/imports/ui/components/Table';

const useStyles = makeStyles(() => ({
  root: {},
  header: {},
  table: {
    marginTop: '48px', // 48px for AppBar
    marginBottom: '108px',
  },
  tableHeadCell: {
    top: '48px', // Height of AppBar
  },
}));

function Mobile(props) {
  const classes = useStyles();

  useEffect(() => {
    document.body.style.backgroundColor = '#fff';
  });

  return (
    <div className={classes.root}>
      <Header
        classes={{ root: classes.header }}
      />
      <Table { ...props }
        classes={{
          root: classes.table,
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
