import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { collection as Item } from '/imports/api/items/Item';
import { values as ITEM_TYPES } from '/imports/enums/ItemTypeEnum';

export const add = new ValidatedMethod({
  name: 'item.add',
  validate: new SimpleSchema({
    type: { type: String, allowedValues: ITEM_TYPES },
    name: { type: String, min: 0, max: 50 },
    balance: { type: SimpleSchema.Integer }
  }).validator(),
  run({ type, name, balance }) {
    Item.insert({ type, name, balance }, (err) => {
      if (err) throw err;
    });
  }
});

export const remove = new ValidatedMethod({
  name: 'item.remove',
  validate: new SimpleSchema({
    itemId: { type: String }
  }).validator(),
  run({ itemId }) {
    Item.remove({ _id: itemId }, (err) => {
      if (err) throw err;
    });
  }
});

const METHODS = _.pluck([
  add,
  remove
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 5000);
}
