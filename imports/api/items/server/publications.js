import { Meteor } from 'meteor/meteor';

import {
  queryItems,
  queryLatestItem,
} from '/imports/api/items/queries';

Meteor.publish('items.list', function() {
  return queryItems();
});

Meteor.publish('items.latest', function() {
  return queryLatestItem();
});
