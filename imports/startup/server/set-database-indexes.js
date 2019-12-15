import { Meteor } from 'meteor/meteor';

import { collection as Item } from '/imports/api/items/Item';

Meteor.startup(() => {
  /**
    The list is sorted on create time descending so new items always show at the top.
  */
  Item._ensureIndex({ created: 1 });

  /**
    The mechanism I'm using to communicate to the UI that it needs to ask for an updated
    set of balance sheet totals is by keeping track of the latest item to get added/updated/removed.

    Then I can just diff that item on the UI when it changes and if necessary ask the server for new values.
  */
  Item._ensureIndex({ updated: 1 });

  /**
    Other considerations:
      - Index balance and allow user to sort list by balance asc/desc,
      - Add a text index on name and allow users to look for items by name
      - Add an index on type, created to filter by type
  */
});
