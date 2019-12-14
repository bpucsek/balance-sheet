import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { collection as Item } from '/imports/api/items/Item';
import { map as ItemTypeEnum } from '/imports/enums/ItemTypeEnum';

const aggregateByType = (type) => (
  Item.rawCollection().aggregate([
    {
      $match: {
        type,
      },
    }, {
      $group: {
        _id: type,
        total: { $sum: '$balance' },
      },
    },
  ]).toArray()
);

export const recalculateBalanceSheet = new ValidatedMethod({
  name: 'item.recalculateBalanceSheet',
  validate: null,
  async run() {
    const assetAggregation = await aggregateByType(ItemTypeEnum.Asset),
      assetTotal = assetAggregation[0].total,
      liabilityAggregation = await aggregateByType(ItemTypeEnum.Liability),
      liabilityTotal = liabilityAggregation[0].total;

    return {
      assets: assetTotal,
      liabilities: liabilityTotal,
      netWorth: assetTotal + liabilityTotal,
    };
  },
});

const METHODS = _.pluck([
  recalculateBalanceSheet,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() {
      return true;
    },
  }, 60, 60000);
}
