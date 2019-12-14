import React from 'react';

import { makeStyles, fade, lighten } from '@material-ui/core/styles';

import { SummaryContainer } from '/imports/ui/pages/BalanceSheet/containers/LatestItemContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.grey[50],
    borderTop: `1px solid ${lighten(fade(theme.palette.divider, 1), 0.88)}`, // Match MUI borders
  },
}));

function MobileFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SummaryContainer />
    </div>
  );
}

export default MobileFooter;
