import React from 'react';

export default ({ children, style }) => (
  <ul style={{ padding: '8px 0px', ...style }}>
    {children}
  </ul>
);
