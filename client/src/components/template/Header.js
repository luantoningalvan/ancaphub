import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo-prov.png";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import NotificationsIcon from "react-ionicons/lib/IosNotifications";
import MessagesIcon from "react-ionicons/lib/IosChatbubbles";
import Search from "./Search";

const AppBar = styled.header`
  background: ${props => props.theme.pallete.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height: 64px;
  position:fixed;
  top:0;
  left:0
`;

const HeaderWrapper = styled.div`
  width:100%;
  height:64px;
`

const Logo = styled.div`
  height: 64px;
  width: 64px;
  display: flex;
  align-items: start;
  justify-content: center;

  > a img {
    height: 54px;
  }
`;

const HeaderMenu = styled.ul`
  display: flex;
  margin-right: 25px;
`;

const HeaderMenuItem = styled.li`
  list-style: none;
  margin-right: 5px;

  &:last-child {
    margin-right: 0px;
  }

  > a {
    display: block;
    padding: 10px;
    border-radius: 5px;
    background: ${props =>
      props.current ? "rgba(0,0,0,0.15)" : "transparent"};

    &:hover {
      background: rgba(0, 0, 0, 0.15);
    }
  }

  > a svg {
    fill: rgba(0, 0, 0, 0.5);
  }
`;

const Header = () => {
  const { url } = useRouteMatch();

  return (
    <>
    <AppBar>
      <Logo>
        <Link to="/"><img src={logo} alt="Logo AncapHub" /></Link>
      </Logo>
      
      <Search />

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
    <HeaderWrapper />
    </>
  );
};

export default Header;
