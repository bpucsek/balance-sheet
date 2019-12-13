import React from 'react';

import DesktopLayout from '/imports/ui/pages/BalanceSheet/layouts/Desktop';
import MobileLayout from '/imports/ui/pages/BalanceSheet/layouts/Mobile';

export default function(props) {
  if (props.device.isMobile) {
    return (<MobileLayout { ...props } />);
  } else {
    return (<DesktopLayout { ...props } />);
  }
}
