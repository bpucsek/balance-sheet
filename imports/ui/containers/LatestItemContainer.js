import { withTracker } from 'meteor/react-meteor-data';

import { queryLatestItem } from '/imports/api/items/queries';
import Summary from '/imports/ui/components/Summary';

const getData = () => {
  const handle = Meteor.subscribe('items.latest');

  return {
    loading: !handle.ready(),
    latestItem: queryLatestItem().fetch()[0],
  };
};

export const SummaryContainer = withTracker(getData)(Summary);
