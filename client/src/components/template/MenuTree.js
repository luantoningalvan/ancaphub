import React from 'react';
import styled from 'styled-components';
import { StyledLink, Item } from './MenuItem';

const Tree = styled.ul`
  position: absolute;
  z-index: 99;

  left: 74px;
  top: 10px;
  border-radius: 10px;
  background: ${(props) => props.theme.palette.paper};
  display: none;
  transition: 0.4s;

  &:after {
    content: "";
    position: absolute;
    z-index: 99;
    top: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 10px solid ${(props) => props.theme.palette.paper};
    border-bottom: 5px solid transparent;
  }
`;

export default ({ icon, current, children }) => (
  <Item position="relative">
    <StyledLink to="#" current={current}>
      <i>{icon}</i>
    </StyledLink>

    <Tree>{children}</Tree>
  </Item>
);
