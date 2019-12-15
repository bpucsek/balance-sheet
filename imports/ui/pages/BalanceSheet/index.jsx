import PropTypes from 'prop-types';
import React from 'react';

import DesktopLayout from '/imports/ui/pages/BalanceSheet/layouts/Desktop';
import MobileLayout from '/imports/ui/pages/BalanceSheet/layouts/Mobile';

function BalanceSheet({
  size,
}) {
  if (size === 'mobile') {
    return (<MobileLayout />);
  }

  return (<DesktopLayout />);
}

BalanceSheet.propTypes = {
  size: PropTypes.oneOf(['mobile', 'desktop']),
};

export default BalanceSheet;
