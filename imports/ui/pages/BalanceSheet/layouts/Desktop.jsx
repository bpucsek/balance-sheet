import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Header from '/imports/ui/components/Header';
import SummaryPanel from '/imports/ui/components/SummaryPanel';
import Table from '/imports/ui/components/Table';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    alignItems: 'center',
  },
  toolbar: {
    width: '900px',
  },
  contentContainer: {
    position: 'relative',
    width: '900px',
    margin: '0 auto',
    display: 'flex',
  },
  content: {
    position: 'relative',
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(10),
    flexGrow: 1,
  },
  table: {
    marginTop: '48px',
    backgroundColor: theme.palette.common.white,
  },
  tableHeadCell: {
    top: '48px',
  },
  panel: {
    position: 'sticky',
    marginTop: '60px',
    top: '60px',
    height: '100%',
    width: '300px',
    flexShrink: 0,
    borderRadius: '4px',
    backgroundColor: theme.palette.common.white,
  },
}));

function Desktop(props) {
  const classes = useStyles();

  useEffect(() => {
    document.body.style.backgroundColor = '#eee';
  });

  return (
    <div className={classes.root}>
      <Header
        classes={{
          root: classes.header,
          toolbar: classes.toolbar,
        }}
      />
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Table { ...props }
            classes={{
              root: classes.table,
              headCell: classes.tableHeadCell,
            }}
          />
        </div>
        <SummaryPanel
          classes={{
            root: classes.panel,
          }}
        />
      </div>
    </div>
  );
}

export default Desktop;
