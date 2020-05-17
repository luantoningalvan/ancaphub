import React from "react";

const Tabs = ({ children, style }) => {
  return (
    <ul
      style={{ 
        display: "flex", 
        width: "100%", 
        overflowY: "scroll", 
        ...style 
      }}
    >
      {children}
    </ul>
  );
};

export default Tabs;
