import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

import { values as ITEM_TYPES } from '/imports/enums/ItemTypeEnum';

import { formatValue } from '/imports/api/items/utils';

const styles = () => ({
  root: {},
  column: {
    width: '50%',
  },
  cell: {
    borderBottom: 'none',
    width: '150px',
  },
  labelCell: {
    fontWeight: 600,
  },
  valueCell: {},
});

function shouldRefreshTotals(prev, curr) {
  return (
    !!curr && (
      !prev ||
      prev._id !== curr._id ||
      prev.type !== curr.type ||
      prev.balance !== curr.balance
    )
  );
}

function Row({ classes, label, value }) {
  return (
    <TableRow className={classes.row}>
      <TableCell
        align={'right'}
        className={classNames(classes.cell, classes.labelCell)}
      >
        {label}
      </TableCell>
      <TableCell
        align={'right'}
        className={classNames(classes.cell, classes.valueCell)}
      >
        {formatValue(value)}
      </TableCell>
    </TableRow>
  );
}

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: null,
      liabilities: null,
      netWorth: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (shouldRefreshTotals(prevProps.latestItem, this.props.latestItem)) {
      Meteor.call('item.recalculateBalanceSheet', null, (err, res) => {
        if (err) throw err;

        this.setState(() => ({
          assets: res.assets,
          liabilities: res.liabilities,
          netWorth: res.netWorth,
        }));
      });
    }
  }

  renderRow(type) {
    return (
      <Row
        classes={this.props.classes}
        label={_i18n(`component.Summary.${type}`)}
        value={this.state[type]}
      />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Table
        size={'small'}
      >
        <colgroup>
          <col className={classes.column} />
          <col className={classes.column} />
        </colgroup>
        <TableBody>
          {this.renderRow('assets')}
          {this.renderRow('liabilities')}
          {this.renderRow('netWorth')}
        </TableBody>
      </Table>
    );
  }
}

Summary.propTypes = {
  latestItem: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(ITEM_TYPES).isRequired,
  }),
};

export default withStyles(styles)(Summary);
