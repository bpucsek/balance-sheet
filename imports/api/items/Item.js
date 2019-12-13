import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { values as ITEM_TYPES } from '/imports/enums/ItemTypeEnum';

const collection = new Mongo.Collection('Item');

// Formally disallow updating records directly from the UI
collection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const schema = new SimpleSchema({
  _id: { type: String },
  type: { type: String, allowedValues: ITEM_TYPES },
  name: { type: String, min: 0, max: 50 },
  balance: { type: SimpleSchema.Integer }
});

collection.attachSchema(schema);

export { collection };
