import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo-prov.png";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import NotificationsIcon from "react-ionicons/lib/IosNotifications";
import MessagesIcon from "react-ionicons/lib/IosChatbubbles";
import Search from "./Search";
import Dropdown from "../ui/Dropdown";
import DropdownListContainer from "../ui/DropdownListContainer"
import DropdownListItem from "../ui/DropdownListItem"
import DropdownHeader from "../ui/DropdownHeader"
import CardFooter from "../ui/CardFooter";
import Switch from "../ui/FlipSwitch";
import { FormattedMessage } from "react-intl";
import Notification from "../notifications";

// Icons
import ArrowDownIcon from "react-ionicons/lib/IosArrowDown";
import ProfileIcon from "react-ionicons/lib/MdPerson";
import BookIcon from "react-ionicons/lib/MdBook";
import BookmarkIcon from "react-ionicons/lib/MdBookmark";
import ContrastIcon from "react-ionicons/lib/MdContrast";
import SettingsIcon from "react-ionicons/lib/MdSettings";
import LogoutIcon from "react-ionicons/lib/IosLogOut";

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

const notifications = [
  {
    type: "comment_liked",
    date: "15 minutes ago",
    data: {
      _id: "as89d6as89d",
      name: "Vinícius de Velotrol",
      avatar: "https://scontent.fplu8-1.fna.fbcdn.net/v/t1.0-9/54516855_2104962562924459_2209947479099572224_n.jpg?_nc_cat=108&_nc_sid=7aed08&_nc_oc=AQmm5SssRkHd18c8_lbKmR7cGi1hKGDXJKfdv3Zdk_4OQoOOjS_X3eTf-csV3hgxuNo&_nc_ht=scontent.fplu8-1.fna&oh=95b8e192f32807e1f23cf5eb839de947&oe=5EA45CB2"
    }
  },
  {
    type: "post_commented",
    date: "15 minutes ago",
    data: {
      _id: "as89d6as89d",
      name: "Vinícius de Velotrol",
      avatar: "https://scontent.fplu8-1.fna.fbcdn.net/v/t1.0-9/54516855_2104962562924459_2209947479099572224_n.jpg?_nc_cat=108&_nc_sid=7aed08&_nc_oc=AQmm5SssRkHd18c8_lbKmR7cGi1hKGDXJKfdv3Zdk_4OQoOOjS_X3eTf-csV3hgxuNo&_nc_ht=scontent.fplu8-1.fna&oh=95b8e192f32807e1f23cf5eb839de947&oe=5EA45CB2"
    }
  },
  {
    type: "post_shared",
    date: "15 minutes ago",
    data: {
      _id: "as89d6as89d",
      name: "Vinícius de Velotrol",
      avatar: "https://scontent.fplu8-1.fna.fbcdn.net/v/t1.0-9/54516855_2104962562924459_2209947479099572224_n.jpg?_nc_cat=108&_nc_sid=7aed08&_nc_oc=AQmm5SssRkHd18c8_lbKmR7cGi1hKGDXJKfdv3Zdk_4OQoOOjS_X3eTf-csV3hgxuNo&_nc_ht=scontent.fplu8-1.fna&oh=95b8e192f32807e1f23cf5eb839de947&oe=5EA45CB2"
    }
  }
];

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
      <Dropdown placement="bottom" offsetY={16} offsetX="-8vw" toggle={
        <HeaderMenuItem current={url.includes("/notifications")}>
          <div><NotificationsIcon /></div>
        </HeaderMenuItem>
      }>
        <DropdownHeader><FormattedMessage id="common.notifications" /></DropdownHeader>
        <>
          <ul style={{ maxWidth: 400 }}>
            {notifications.map((notification, index) => (<Notification notification={notification} key={index} />))}
          </ul>
          <CardFooter link="/notifications" label="See all" />
        </>
      </Dropdown>
      <Dropdown placement="bottom" offsetY={16} offsetX="-4vw" toggle={
        <HeaderMenuItem current={url.includes("/messages")}>
          <div><MessagesIcon /></div>
        </HeaderMenuItem>
      }>
        <p>Messages will appear here...</p>
      </Dropdown>
      <Dropdown  offsetY={16} offsetX="-4vw" placement="bottom" toggle={
        <HeaderMenuItem>
          <div><ArrowDownIcon /></div>
        </HeaderMenuItem>
      }>
          <DropdownListContainer>
            <DropdownListItem icon={<ProfileIcon />}>
              <Link to="/user"><FormattedMessage id="common.profile"/></Link>
            </DropdownListItem>
            <DropdownListItem icon={<BookIcon />}>
              <Link to="/user/contributions"><FormattedMessage id="common.contributions"/></Link>
            </DropdownListItem>
            <DropdownListItem icon={<BookmarkIcon />}>
              <Link to="/user/lists"><FormattedMessage id="account.bookmarks.savedItemsHeading" /></Link>
            </DropdownListItem>
            <DropdownListItem icon={<ContrastIcon />} action={<Switch />}>
              <FormattedMessage id="common.darkMode" />
            </DropdownListItem>
            <DropdownListItem icon={<SettingsIcon />}>
              <FormattedMessage id="common.settings" />
            </DropdownListItem>
            <DropdownListItem icon={<LogoutIcon />}>
              <FormattedMessage id="common.logout" />
            </DropdownListItem>
          </DropdownListContainer>
        </Dropdown>
      </HeaderMenu>
    </AppBar>
    <HeaderWrapper />
    </>
  );
};

export default Header;
