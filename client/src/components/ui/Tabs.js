import React from "react";

const Tabs = ({ children, style }) => {
  return <ul style={{ display: "flex", ...style }}>{children}</ul>;
};

export default Tabs;
