import React from "react";
import styled from 'styled-components'
import logo from '../../assets/logo-prov.png'
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

// Icons
import SearchIcon from 'react-ionicons/lib/IosSearch'
import NotificationsIcon from 'react-ionicons/lib/IosNotifications'
import MessagesIcon from 'react-ionicons/lib/IosChatbubbles'

const AppBar = styled.header`
  grid-area: header;
  background: ${props => props.theme.pallete.secondary};
  display: flex;
  justify-content: space-between;
  align-items:center
`

const Logo = styled.div`
  height:64px;
  width:64px;
  display:flex;
  align-items:start;
  justify-content:center;

  > img {
    height: 54px
  }
`

const Search = styled.div`
  height:50px;
  border-radius:5px;
  width: 400px;
  background: rgba(0,0,0, 0.15);
  display: flex;
  align-items:center;
  color:white;
  padding: 0px 10px;

  > i svg { fill: white; }

  > input {
    border: none;
    background: transparent;
    height:50px;
    padding:10px;
    outline: none;

    &::placeholder { color: #eee; font-size:16px; font-family: Ubuntu }
  }
`

const HeaderMenu = styled.ul`
  display: flex;
  margin-right:25px;
`

const HeaderMenuItem = styled.li`
  list-style:none;
  margin-right:5px;

  &:last-child { margin-right: 0px; }

  > a {
    display: block;
    padding: 10px;
    border-radius:5px;
    background: ${ props => props.current ? 'rgba(0,0,0,0.15)' : 'transparent'};

    &:hover {
      background: rgba(0,0,0,0.15);
    }
  }

  > a svg {
    fill: rgba(0,0,0,0.5);
  }
`

const Header = () => {
  const { url } = useRouteMatch()
  
  return (
    <AppBar>
      <Logo>
        <img src={logo} alt="Logo AncapHub"/>
      </Logo>
      <Search>
        <i><SearchIcon /></i>
        <input type="text" placeholder="Pesquisar..." />
      </Search>
        <HeaderMenu>
          <HeaderMenuItem current={url.includes("/notifications")}>
            <Link to="/notifications">
              <NotificationsIcon />
            </Link>
          </HeaderMenuItem>
          <HeaderMenuItem current={url.includes("/messages")}>
            <Link to="/messages">
              <MessagesIcon />
            </Link>
          </HeaderMenuItem>
        </HeaderMenu>
    </AppBar>
  )
};

export default Header;
