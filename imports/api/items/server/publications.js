import { Meteor } from 'meteor/meteor';

import { queryItems } from '/imports/api/items/queries';

Meteor.publish('items.list', function() {
  return queryItems();
});
