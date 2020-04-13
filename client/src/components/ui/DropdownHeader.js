import React from 'react';
import styled from 'styled-components';

const DropdownTitleContainerWrap = styled.div`
  background-color: ${(props) => props.theme.palette.paper};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 16px 16px 8px;
  h3 {
    color: ${(props) => props.theme.palette.text.primary};
  }
`;

export default ({ children, ...props }) => (
  <DropdownTitleContainerWrap {...props}>
    <h3>{children}</h3>
  </DropdownTitleContainerWrap>
);
