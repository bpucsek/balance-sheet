import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import i18n from '/imports/strings/i18n';
import App from '/imports/ui/App';

global._i18n = i18n;

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});
