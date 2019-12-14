import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));

function MobileFooter() {
  const classes = useStyles();

  Meteor.call('item.recalculateBalanceSheet', null, (err, res) => {
    if (err) throw err;
    console.log(res);
  });

  return (
    <div className={classes.root}>

    </div>
  );
}

export default MobileFooter;
