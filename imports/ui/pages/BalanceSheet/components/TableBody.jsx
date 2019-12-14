import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import MuiTableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import { queryItems } from '/imports/api/items/queries';
import { formatBalance } from '/imports/api/items/utils';
import EditItemDialog from '/imports/ui/pages/BalanceSheet/components/EditItemDialog';

const useStyles = makeStyles(() => ({
  root: {},
  row: {
    cursor: 'pointer',
  },
}));

function TableBody({ loading, items }) {
  const classes = useStyles();
  const [selectedItem, selectItem] = useState(null);

  // TODO: Show when loading

  return (
    <React.Fragment>
      <MuiTableBody className={classes.root}>
        {items.map((item) => (
          <TableRow
            className={classes.row}
            hover
            key={item._id}
            onClick={() => {
              selectItem(item);
            }}
          >
            <TableCell>{_i18n(`enum.ItemTypeEnum.${item.type}`)}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell align={'right'}>{formatBalance(item.balance)}</TableCell>
          </TableRow>
        ))}
      </MuiTableBody>
      {selectedItem &&
        <EditItemDialog
          item={selectedItem}
          onClose={() => {
            selectItem(null);
          }}
        />
      }
    </React.Fragment>
  );
}

const getData = () => {
  let handle = Meteor.subscribe('items.list');

  return {
    loading: !handle.ready(),
    items: queryItems().fetch(),
  };
};

TableBody.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
};

export default withTracker(getData)(TableBody);
