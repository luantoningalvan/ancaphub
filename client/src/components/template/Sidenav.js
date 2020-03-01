import React from "react";
import styled from "styled-components";
import defaultProfilePicture from '../../assets/default-profile-picture.jpg'
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Nav = styled.aside`
  width: 64px;
  height: calc(100vh - 64px);
  background: ${props => props.theme.pallete.paper};
  grid-area: sidenav
`;

const UserMenu = styled.div`
 height:64px;
 width:64px;
 padding:10px;
 overflow: hidden;

 > a {
   display:block;
   border: none;
   outline:none;
   border-radius: 100%;
   height:44px;
   width:44px;
   overflow: hidden;
   cursor: pointer;

   > img {
     height:100%;
     width:100%;
   }
 }
`

const Sidenav = () => (
  <Nav>
    <UserMenu>
      <Link to="/user">
        <img src={defaultProfilePicture} />
      </Link>
    </UserMenu>
    <Menu />
  </Nav>
);

export default Sidenav;
