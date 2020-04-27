import React from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import NotificationsIcon from 'react-ionicons/lib/IosNotifications';
import MessagesIcon from 'react-ionicons/lib/IosChatbubbles';
import { FormattedMessage } from 'react-intl';
import ArrowDownIcon from 'react-ionicons/lib/IosArrowDown';
import ProfileIcon from 'react-ionicons/lib/MdPerson';
import BookIcon from 'react-ionicons/lib/MdBook';
import BookmarkIcon from 'react-ionicons/lib/MdBookmark';
import ContrastIcon from 'react-ionicons/lib/MdContrast';
import SettingsIcon from 'react-ionicons/lib/MdSettings';
import LogoutIcon from 'react-ionicons/lib/IosLogOut';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import Dropdown from '../ui/Dropdown';
import DropdownListContainer from '../ui/DropdownListContainer';
import DropdownListItem from '../ui/DropdownListItem';
import DropdownHeader from '../ui/DropdownHeader';
import CardBody from '../ui/CardBody';
import CardFooter from '../ui/CardFooter';
import Switch from '../ui/FlipSwitch';
import Notification from '../notifications';
import { logoutRequest as logout } from '../../actions/auth';
import { switchColorMode as changeTheme } from '../../actions/settings';
import logo from '../../assets/logo-prov.png';

const AppBar = styled.header`
  background: ${(props) => props.theme.palette.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
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
  cursor: pointer;

  &:last-child {
    margin-right: 0px;
  }

  > a,
  > div {
    display: block;
    position: relative;
    padding: 10px;
    border-radius: 5px;
    background: ${(props) => (props.current ? 'rgba(0,0,0,0.15)' : 'transparent')};
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.15);
    }
  }

  > a svg,
  > div svg {
    fill: ${(props) => props.theme.palette.text.contrast};
  }

  .badge {
    position: absolute;
    height: 8px;
    width: 8px;
    top: 8px;
    right: 8px;
    border-radius: 4px;
    background: red;
  }
`;

const Header = ({ user }) => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { notifications, notReadCount } = useSelector(
    (state) => state.notifications,
  );

  const { colorMode } = useSelector((state) => state.settings);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleChangeTheme = () => {
    if (colorMode === 'dark') dispatch(changeTheme('light'));
    if (colorMode === 'light') dispatch(changeTheme('dark'));
  };

  return (
    <>
      <AppBar>
        <Logo>
          <Link to="/">
            <img src={logo} alt="Logo AncapHub" />
          </Link>
        </Logo>

        <Search />

        <HeaderMenu>
          <Dropdown
            placement="bottom"
            offsetY={16}
            offsetX="-8vw"
            toggle={(
              <HeaderMenuItem current={url.includes('/notifications')}>
                <div>
                  <NotificationsIcon />
                  {notReadCount > 0 && (
                  <span className="badge" />
                  )}
                </div>
              </HeaderMenuItem>
            )}
          >
            <DropdownHeader>
              <FormattedMessage id="common.notifications" />
            </DropdownHeader>
            {notifications.length > 0 ? (
              <>
                <ul
                  style={{
                    maxWidth: 400,
                    maxHeight: 400,
                    overflowY: 'scroll',
                  }}
                >
                  {notifications.map((notification, index) => (
                    <Notification notification={notification} key={index} />
                  ))}
                </ul>
                <CardFooter link="/notifications" label={<FormattedMessage id="common.showMore" />} />
              </>
            ) : (
              <CardBody>
                <FormattedMessage id="notifications.noNotificationsFound" />
              </CardBody>
            )}
          </Dropdown>

          <Dropdown
            placement="bottom"
            offsetY={16}
            offsetX="-4vw"
            toggle={(
              <HeaderMenuItem current={url.includes('/messages')}>
                <div><MessagesIcon /></div>
              </HeaderMenuItem>
      )}
          >
            <p>Messages will appear here...</p>
          </Dropdown>

          <Dropdown
            offsetY={16}
            offsetX="-4vw"
            placement="bottom"
            toggle={(
              <HeaderMenuItem>
                <div>
                  <ArrowDownIcon />
                </div>
              </HeaderMenuItem>
            )}
          >
            <DropdownListContainer>
              <DropdownListItem icon={<ProfileIcon />}>
                <Link to={`/${user._id}`}>
                  <FormattedMessage id="common.profile" />
                </Link>
              </DropdownListItem>

              <DropdownListItem icon={<BookIcon />}>
                <Link to="/contributions"><FormattedMessage id="common.contributions" /></Link>
              </DropdownListItem>
              <DropdownListItem icon={<BookmarkIcon />}>
                <Link to="/bookmarks">
                  <FormattedMessage id="account.bookmarks.savedItemsHeading" />
                </Link>
              </DropdownListItem>
              <DropdownListItem icon={<ContrastIcon />} action={<Switch value={colorMode === 'dark'} onChange={() => handleChangeTheme()} />}>
                <FormattedMessage id="common.darkMode" />
              </DropdownListItem>
              <DropdownListItem icon={<SettingsIcon />}>
                <Link to="/settings">
                  <FormattedMessage id="common.settings" />
                </Link>
              </DropdownListItem>
              <DropdownListItem icon={<LogoutIcon />}>
                <Link onClick={handleLogout}>
                  <FormattedMessage id="common.logout" />
                </Link>
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
