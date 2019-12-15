import PropTypes from 'prop-types';
import React from 'react';

import Paper from '@material-ui/core/Paper';

import { SummaryContainer } from '/imports/ui/containers/LatestItemContainer';

function SummaryPanel({
  classes,
}) {
  return (
    <Paper
      className={classes.root}
      elevation={1}
    >
      <SummaryContainer />
    </Paper>
  );
}

SummaryPanel.propTypes = {
  classes: PropTypes.exact({
    root: PropTypes.string.isRequired,
  }),
};

export default SummaryPanel;
