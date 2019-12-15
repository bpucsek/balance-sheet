import classNames from 'classnames';
import React from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { SummaryContainer } from '/imports/ui/pages/BalanceSheet/containers/LatestItemContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
  },
}));

function SummaryPanel(props) {
  const classes = useStyles();

  return (
    <Paper
      className={classNames(classes.root, props.classes.root)}
      elevation={1}
    >
      <SummaryContainer />
    </Paper>
  );
}

export default SummaryPanel;
