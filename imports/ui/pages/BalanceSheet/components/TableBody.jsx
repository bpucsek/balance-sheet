import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import MuiTableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import { queryItems } from '/imports/api/items/queries';
import { formatValue } from '/imports/api/items/utils';
import EditItemDialog from '/imports/ui/pages/BalanceSheet/components/EditItemDialog';

const useStyles = makeStyles(() => ({
  root: {},
  row: {
    cursor: 'pointer',
  },
}));

function TableBody(props) {
  const classes = useStyles();
  const [selectedItem, selectItem] = useState(null);

  return (
    <React.Fragment>
      <MuiTableBody
        className={classes.root}
      >
        {props.items.map((item) => (
          <TableRow
            className={classes.row}
            hover
            key={item._id}
            onClick={() => {
              selectItem(item);
            }}
          >
            <TableCell>
              {_i18n(`enum.ItemTypeEnum.${item.type}`)}
            </TableCell>
            <TableCell>
              {item.name}
            </TableCell>
            <TableCell align={'right'}>
              {formatValue(item.balance)}
            </TableCell>
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
  classes: PropTypes.exact({
    root: PropTypes.string,
    row: PropTypes.string,
  }),
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withTracker(getData)(TableBody);
