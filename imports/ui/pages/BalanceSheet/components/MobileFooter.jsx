import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));

function MobileFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root} />
  );
}

export default MobileFooter;
