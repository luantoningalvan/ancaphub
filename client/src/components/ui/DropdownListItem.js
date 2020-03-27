import React from "react";
import styled from "styled-components";

const DropdownListItemWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 100px;
  max-width: 400px;
  padding: 8px 1em;
  cursor: pointer;
  
  svg {
    fill: white;
  }
  
  span, span a {
    transition: color 300ms ease-in-out;
  }

  span {
    color: white;
    margin-left: 0.5em;
    
  }

  span a {
    color: white;
    text-decoration: none;
  }

  &:hover > span, &:hover > a, &:hover > span a {
    color: ${props => props.theme.pallete.secondary}
  }
`;

export default ({ children, icon, action, ...props }) => {
  return (
    <DropdownListItemWrap {...props}>
      {icon}
      <span>{children}</span>
      { action && <div> { React.cloneElement(action, { style: { margin: "0 0.5em" } }) } </div> }
    </DropdownListItemWrap>
  );
}