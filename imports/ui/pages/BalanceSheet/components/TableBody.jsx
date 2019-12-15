import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import MuiTableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import { queryItems } from '/imports/api/items/queries';
import { formatValue } from '/imports/api/items/utils';
import AddItemDialog from '/imports/ui/pages/BalanceSheet/components/AddItemDialog';
import EditItemDialog from '/imports/ui/pages/BalanceSheet/components/EditItemDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    cursor: 'pointer',
  },
  helperInfoBody: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  helperInfoCell: {
    borderBottom: 'none',
    textAlign: 'center',
  },
  emptyMessage: {
    paddingTop: theme.spacing(10),
    color: theme.palette.grey[600],
    fontWeight: 300,
    paddingBottom: theme.spacing(1),
  },
}));

// Hack: Get around warning about putting divs inside of a <table>
function HelperInfo({ classes, children }) {
  return (
    <MuiTableBody className={classes.helperInfoBody}>
      <TableRow>
        <TableCell className={classes.helperInfoCell}>
          {children}
        </TableCell>
      </TableRow>
    </MuiTableBody>
  );
}

function TableBody(props) {
  const classes = useStyles();
  const [selectedItem, selectItem] = useState(null);
  const [dialogOpen, toggleDialog] = useState(false);
  const { items, loading } = props;

  if (loading) {
    return (
      <HelperInfo classes={classes}>
        <LinearProgress />
      </HelperInfo>
    );
  } else if (!items.length) {
    return (
      <HelperInfo classes={classes}>
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
      </HelperInfo>
    );
  }

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
  const handle = Meteor.subscribe('items.list');

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
