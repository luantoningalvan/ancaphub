import React from 'react';

const Collapse = ({ expanded, children }) => {
  if (expanded) {
    return children;
  }
  return <></>;
};

export default Collapse;
