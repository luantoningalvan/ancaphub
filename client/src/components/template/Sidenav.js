import React from "react";
import styled from "styled-components";

import Menu from "./Menu";

const Nav = styled.aside`
  width: 64px;
  height: calc(100vh - 64px);
  background: ${props => props.theme.pallete.paper};
  grid-area: sidenav
`;

const Sidenav = () => (
  <Nav>
    <Menu />
  </Nav>
);

export default Sidenav;
