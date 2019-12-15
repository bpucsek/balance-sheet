import { Meteor } from 'meteor/meteor';

import {
  queryItems,
  queryLatestItem,
} from '/imports/api/items/queries';

/**
  Note:
    These handlers correspond with the Meteor.subscribe calls from the UI.

    They will open up a websocket connection with the client and take advantage of tailing the Mongo oplog
    in order to provide a pretty seamless way to have a near instantaneous flow of information
    between the server and client.

    This stuff can get become cumbersome to work with on more complicated apps, but in this case it's pretty helpful.
    Even if multiple users are updating the balance sheet, all clients viewing the balance sheet will
    receive all changes.
*/

Meteor.publish('items.list', function() {
  return queryItems();
});

Meteor.publish('items.latest', function() {
  return queryLatestItem();
});
