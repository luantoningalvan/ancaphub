import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo-prov.png";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import NotificationsIcon from "react-ionicons/lib/IosNotifications";
import MessagesIcon from "react-ionicons/lib/IosChatbubbles";
import Search from "./Search";
import Dropdown from "../ui/Dropdown";
import Switch from "../ui/FlipSwitch";
import { FormattedMessage } from "react-intl";

// Icons
import ArrowDownIcon from "react-ionicons/lib/IosArrowDown";
import ProfileIcon from "react-ionicons/lib/MdPerson";
import BookIcon from "react-ionicons/lib/MdBook";
import BookmarkIcon from "react-ionicons/lib/MdBookmark";
import ContrastIcon from "react-ionicons/lib/MdContrast";
import SettingsIcon from "react-ionicons/lib/MdSettings";
import LogoutIcon from "react-ionicons/lib/IosLogOut";

const headerScope = [ 
  { text: <Link to="/user"><FormattedMessage id="common.profile"/></Link>, icon: <ProfileIcon /> }, 
  { text: <Link to="/user"><FormattedMessage id="common.contributions"/></Link>, icon: <BookIcon />}, 
  { text: <Link to="/user"><FormattedMessage id="account.bookmarks.savedItemsHeading" /></Link>, icon: <BookmarkIcon/> },
  { text: <FormattedMessage id="common.darkMode" />, icon: <ContrastIcon />, component: <Switch />},
  { text: <FormattedMessage id="common.settings" />, icon: <SettingsIcon />},
  { text: <FormattedMessage id="common.logout" />, icon: <LogoutIcon />},
];

const AppBar = styled.header`
  background: ${props => props.theme.pallete.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 64px;
`;

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

  > a, > div {
    display: block;
    padding: 10px;
    border-radius: 5px;
    background: ${props =>
      props.current ? "rgba(0,0,0,0.15)" : "transparent"};

    &:hover {
      background: rgba(0, 0, 0, 0.15);
    }
  }

  > a svg, > div svg {
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
      <Dropdown placement="bottom" title={<FormattedMessage id="common.notifications" />} options={[]} showOnEmpty={<p>Nenhuma nova notificação</p>}>
        <HeaderMenuItem current={url.includes("/notifications")}>
            <div>
              <NotificationsIcon />
            </div>
          </HeaderMenuItem>
        </Dropdown>
        <Dropdown placement="bottom" title={<FormattedMessage id="common.messages" />} options={[]} showOnEmpty={<p>Nenhuma nova mensagem</p>}>
        <HeaderMenuItem current={url.includes("/messages")}>
            <div>
              <MessagesIcon />
            </div>
          </HeaderMenuItem>
        </Dropdown>
        <Dropdown placement="bottom" options={headerScope}>
          <HeaderMenuItem>
            <div>
              <ArrowDownIcon />
            </div>
          </HeaderMenuItem>
        </Dropdown>
      </HeaderMenu>
    </AppBar>
    <HeaderWrapper />
    </>
  );
};

export default Header;
