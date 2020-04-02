import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import defaultProfilePicture from '../../assets/default-profile-picture.jpg';
import Menu from './Menu';

const Nav = styled.aside`
  width: 64px;
  height: calc(100vh - 64px);
  position: fixed;
  top: 64px;
  left: 0;
  background: ${(props) => props.theme.palette.paper};
`;

const UserMenu = styled.div`
 height: 64px;
 width: 64px;
 padding: 10px;
 overflow: hidden;

 > a {
   display: block;
   border: none;
   outline: none;
   border-radius: 100%;
   height: 44px;
   width: 44px;
   overflow: hidden;
   cursor: pointer;

   > img {
     height: 100%;
     width: 100%;
   }
 }
`;

const Sidenav = () => (
  <Nav>
    <UserMenu>
      <Link to="/user">
        <img src={defaultProfilePicture} alt="profile pic" />
      </Link>
    </UserMenu>
    <Menu />
  </Nav>
);

export default Sidenav;
