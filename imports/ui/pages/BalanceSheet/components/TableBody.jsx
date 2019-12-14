import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import compose from 'recompose/compose';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';

import { queryItems } from '/imports/api/items/queries';

const styles = (theme) => ({
  root: {}
});

const handleRemoveItem = (itemId) => () => {
  Meteor.call('item.remove', { itemId }, (err) => {
    if (err) throw err;
  })
};

function TableBody({ classes, loading, items }) {
  // TODO: Show when loading

  return (
    <Table>
      <MuiTableBody className={classes.root}>
        {items.map(({ _id, type, name, balance }) => (
          <TableRow key={_id}>
            <TableCell>{type}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{balance}</TableCell>
            <TableCell>
              <IconButton
                onClick={handleRemoveItem(_id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </MuiTableBody>
    </Table>
  );
}

const getData = () => {
  let handle = Meteor.subscribe('items.list');

  return {
    loading: !handle.ready(),
    items: queryItems().fetch()
  };
};

export default compose(
  withStyles(styles),
  withTracker(getData)
)(TableBody);