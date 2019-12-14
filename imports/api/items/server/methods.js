import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { collection as Item } from '/imports/api/items/Item';
import {
  map as ItemTypeEnum,
  values as ITEM_TYPES,
} from '/imports/enums/ItemTypeEnum';

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

export const add = new ValidatedMethod({
  name: 'item.add',
  validate: new SimpleSchema({
    type: { type: String, allowedValues: ITEM_TYPES },
    name: { type: String, min: 0, max: 50 },
    balance: { type: SimpleSchema.Integer },
  }).validator(),
  run({ type, name, balance }) {
    Item.insert({
      type,
      name,
      balance,
      updated: new Date(),
    }, (err) => {
      if (err) throw err;
    });
  },
});

export const edit = new ValidatedMethod({
  name: 'item.edit',
  validate: new SimpleSchema({
    itemId: { type: String },
    type: { type: String, allowedValues: ITEM_TYPES },
    name: { type: String, min: 0, max: 50 },
    balance: { type: SimpleSchema.Integer },
  }).validator(),
  run({ itemId, type, name, balance }) {
    Item.update({
      _id: itemId,
    }, {
      $set: {
        type,
        name,
        balance,
        updated: new Date(),
      },
    }, (err) => {
      if (err) throw err;
    });
  },
});


export const remove = new ValidatedMethod({
  name: 'item.remove',
  validate: new SimpleSchema({
    itemId: { type: String },
  }).validator(),
  run({ itemId }) {
    Item.remove({ _id: itemId }, (err) => {
      if (err) throw err;
    });
  },
});

const METHODS = _.pluck([
  add,
  edit,
  recalculateBalanceSheet,
  remove,
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
