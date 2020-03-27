import React from "react";
import styled from "styled-components";

const DropdownTitleContainerWrap = styled.div`
  background-color: ${props => props.theme.pallete.paper};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 8px 1em;
  h3 {
    color: white;
  }
`

export default ({ children, ...props }) => {
  return (
    <DropdownTitleContainerWrap {...props}>
      <h3>{children}</h3>
    </DropdownTitleContainerWrap>
  );
}