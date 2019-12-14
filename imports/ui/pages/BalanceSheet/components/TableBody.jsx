import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import MuiTableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import { queryItems } from '/imports/api/items/queries';

const useStyles = makeStyles(() => ({
  root: {},
}));

const handleRemoveItem = (itemId) => () => {
  Meteor.call('item.remove', { itemId }, (err) => {
    if (err) throw err;
  });
};

function TableBody({ loading, items }) {
  const classes = useStyles();

  // TODO: Show when loading

  return (
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
