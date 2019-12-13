import React from 'react';

export default function({ device }) {
  return (
    <div>
      {(device.isMobile) ? 'mobile' : 'desktop'}
    </div>
  );
}
