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

const aggregateByType = async (type) => {
  let records = await Item.rawCollection().aggregate([
    {
      $match: {
        deleted: { $exists: false },
        type,
      },
    }, {
      $group: {
        _id: type,
        total: { $sum: '$balance' },
      },
    },
  ]).toArray();

  if (!records.length) return 0;

  return records[0].total;
};

export const recalculateBalanceSheet = new ValidatedMethod({
  name: 'item.recalculateBalanceSheet',
  validate: null,
  async run() {
    const assetTotal = await aggregateByType(ItemTypeEnum.Asset),
      liabilityTotal = await aggregateByType(ItemTypeEnum.Liability);

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
    name: { type: String },
    balance: { type: SimpleSchema.Integer },
  }).validator(),
  run({ type, name, balance }) {
    Item.insert({
      type,
      name,
      balance,
      created: new Date(),
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
    name: { type: String },
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
    // Items are soft deleted so that they can still be reported to the UI and trigger balance sheet refreshes.
    Item.update({
      _id: itemId,
    }, {
      $set: {
        updated: new Date(),
        deleted: true,
      },
    }, (err) => {
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
