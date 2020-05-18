import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CloseIcon from 'react-ionicons/lib/MdClose';
import clsx from 'clsx';
import defaultProfilePicture from '../../assets/default-profile-picture.jpg';
import Menu from './Menu';
import IconButton from '../ui/IconButton';

const Nav = styled.aside`
  display: ${(props) => (props.className && props.className == 'collapsed' ? 'none' : 'block')};
  width:100%;
  max-width: 240px;
  height: calc(100vh);
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.palette.paper};

  @media (min-width: 576px) {
      display: block;
      width: 64px;
      height: calc(100vh - 64px);
      position: fixed;
      top: 64px;
  }
`;

const UserMenu = styled.div`
 height: 64px;
 width: 100%;
 padding: 10px;
 display:flex;
 align-items:center;
 justify-content:space-between;

 
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
  @media (min-width: 576px) { button {display:none;}}
  `;

const Sidenav = ({ user, collapsed, setCollapsed }) => (
  <Nav className={clsx(collapsed && 'collapsed')}>
    <UserMenu>
      <Link to={`/${user._id}`}>
        <img src={user.avatar && user.avatar !== '' ? user.avatar : defaultProfilePicture} alt="profile pic" />
      </Link>

      <IconButton onClick={setCollapsed}>
        <CloseIcon />
      </IconButton>
    </UserMenu>
    <Menu />
  </Nav>
);

export default Sidenav;
