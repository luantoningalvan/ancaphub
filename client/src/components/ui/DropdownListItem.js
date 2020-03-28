import React from "react";
import styled from "styled-components";

const DropdownListItemWrap = styled.li`
  display: flex;
  alig-items: flex-start;
  list-style:none;
  align-items: center;
  min-width: 100px;
  max-width: 400px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover{
    a, span {color: ${props => props.theme.palette.primary};}

    svg {
      fill: ${props => props.theme.palette.primary};
    }
  }
  
  svg {
    fill: ${props => props.theme.palette.text.primary};
  }
  
  span, span a {
    transition: color 300ms ease-in-out;
  }

  span {
    color: ${props => props.theme.palette.text.primary};;
    margin-left: 0.5em;
  }

  span a {
    color: ${props => props.theme.palette.text.primary};;
    text-decoration: none;
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