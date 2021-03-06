import { collection as Item } from '/imports/api/items/Item';

const PUBLIC_FIELDS = {
  type: 1,
  name: 1,
  balance: 1,
  created: 1,
  updated: 1,
  deleted: 1,
};

export const queryItems = () => {
  return Item.find({
    deleted: { $exists: false },
  }, {
    fields: PUBLIC_FIELDS,
    sort: { created: -1 },
  });
};

export const queryLatestItem = () => {
  return Item.find({}, {
    fields: PUBLIC_FIELDS,
    sort: { updated: -1 },
    limit: 1,
  });
};
