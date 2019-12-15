import classNames from 'classnames';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { queryItems } from '/imports/api/items/queries';
import { formatValue } from '/imports/api/items/utils';
import AddItemDialog from '/imports/ui/components/AddItemDialog';
import EditItemDialog from '/imports/ui/components/EditItemDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    cursor: 'pointer',
  },
  helperInfo: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(15),
  },
  emptyMessage: {
    paddingTop: theme.spacing(10),
    color: theme.palette.grey[600],
    fontWeight: 300,
    paddingBottom: theme.spacing(1),
  },
  type: {
    width: '80px',
  },
  name: {},
  balance: {
    maxWidth: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

function Table(props) {
  const classes = useStyles();
  const [selectedItem, selectItem] = useState(null);
  const [dialogOpen, toggleDialog] = useState(false);
  const { items, loading } = props;

  if (loading) {
    return (
      <div className={classes.helperInfo}>
        <CircularProgress />
      </div>
    );
  } else if (!items.length) {
    return (
      <div className={classes.helperInfo}>
        <Typography className={classes.emptyMessage}>
          {_i18n('component.TableBody.empty')}
        </Typography>
        <Button
          color={'secondary'}
          variant={'contained'}
          onClick={() => {
            toggleDialog(true);
          }}
        >
          {_i18n('component.TableBody.button.add-item')}
        </Button>
        {dialogOpen && <AddItemDialog
          onClose={() => {
            toggleDialog(false);
          }}
        />}
      </div>
    );
  }

  return (
    <React.Fragment>
      <MuiTable
        className={classNames(classes.root, props.classes.root)}
        stickyHeader
      >
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              className={classNames(classes.type, props.classes.headCell)}
            >
              {_i18n('model.Item.type')}
            </TableCell>
            <TableCell
              className={classNames(classes.name, props.classes.headCell)}
            >
              {_i18n('model.Item.name')}
            </TableCell>
            <TableCell
              className={classNames(classes.balance, props.classes.headCell)}
              align={'right'}
            >
              {_i18n('model.Item.balance')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
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
              <TableCell
                align={'right'}
                className={classes.balance}
              >
                {formatValue(item.balance)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
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
  const handle = Meteor.subscribe('items.list');

  return {
    loading: !handle.ready(),
    items: queryItems().fetch(),
  };
};

Table.propTypes = {
  classes: PropTypes.exact({
    root: PropTypes.string,
    row: PropTypes.string,
  }),
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withTracker(getData)(Table);
