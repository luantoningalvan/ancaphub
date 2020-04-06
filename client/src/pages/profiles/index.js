import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import LocationIcon from 'react-ionicons/lib/IosPinOutline';
import BirthIcon from 'react-ionicons/lib/IosEggOutline';
import SiteIcon from 'react-ionicons/lib/IosLinkOutline';
import defaultProfilePicture from '../../assets/default-profile-picture.jpg';
import defaultProfileCover from '../../assets/default-profile-cover.jpg';
import Paper from '../../components/ui/Paper';
import Button from '../../components/ui/Button';
import Container from '../../components/ui/Container';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
const Feed = lazy(() => import('./Feed'));
const Lists = lazy(() => import('./Lists'));
const Contributions = lazy(() => import('./Contributions'));
const Followers = lazy(() => import('./Followers'));
const Following = lazy(() => import('./Following'));

const ProfileHeader = styled.div`
  width: 100%;
  background: ${(props) => props.theme.palette.paper};
  border-radius: 10px;
  margin-top: 15px;
  overflow: hidden;
`;
const ProfileCover = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;
const ProfilePicture = styled.div`
  margin-top: -100px;
  display: flex;
  justify-content: center;
  > img {
    height: 128px;
    width: 128px;
    border-radius: 100%;
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  > .follower-count,
  .user-name,
  .user-action-buttons {
    flex: 1;
    display: flex;
  }

  > .follower-count {
    justify-content: flex-start;

    > ul {
      margin: 0;
      padding: 0;
      display: flex;

      > li {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: 0 25px;
        font-size: 0.75rem;
        text-transform: uppercase;

        &::after {
          content: "";
          display: block;
          width: 1px;
          height: 20px;
          background-color: ${(props) => props.theme.palette.border};
          position: absolute;
          top: 8px;
          right: 0;
        }

        &:first-child {
          padding-left: 0px;
        }
        &:last-child {
          &::after {
            display: none;
          }
        }

        > span {
          color: ${(props) => props.theme.palette.text.secondary};
        }
        > .counter {
          text-decoration: none;
          font-weight: bold;
          font-size: 1.375rem;
          color: ${(props) => props.theme.palette.text.primary};
          margin-bottom: 8px;
        }
      }
    }
  }

  > .user-name {
    justify-content: center;
    flex-direction: column;
    align-items: center;

    > h3 {
      font-size: 1.3rem;
      margin-bottom: 5px;
      color: ${(props) => props.theme.palette.text.primary};

    }
    > span {
      font-size: 0.9rem;
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }

  > .user-action-buttons {
    justify-content: flex-end;

    > button {
      margin-left: 10px;
    }
  }
`;

const UserAbout = styled.div`
  > p {
    margin: 10px 0px;
  }
  > ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  > ul li {
    list-style: none;
    margin: 10px 0px;
  }
  > ul li a {
    color: ${(props) => props.theme.palette.text.primary};
  }
  > ul li svg {
    float: left;
    fill: ${(props) => props.theme.palette.text.primary};
    margin-right: 10px;
  }
`;

const Tabs = styled.ul`
  display: flex;

  > li {
    list-style: none;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme.palette.border};
    }
  }

  > li.current {
    border-bottom: 3px solid ${(props) => props.theme.palette.secondary};
  }
  > li a {
    display: block;
    color: ${(props) => props.theme.palette.text.primary};
    text-decoration: none;
    padding: 16px 32px;
  }
`;

export default () => {
  const { path } = useRouteMatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <Container>
      <ProfileHeader>
        <ProfileCover>
          <img src={defaultProfileCover} alt="default cover pic" />
        </ProfileCover>
        <ProfilePicture>
          <img src={defaultProfilePicture} alt="default profile pic" />
        </ProfilePicture>
        <ProfileInfo>
          <div className="follower-count">
            <ul>
              <li>
                <Link to="/user/followers" className="counter">
                  {user.followersCount}
                </Link>
                <span>
                  <FormattedMessage
                    id="common.followers"
                    description="Info quantidade de seguidores"
                  />
                </span>
              </li>
              <li>
                <Link to="/user/following" className="counter">
                  {user.followingCount}
                </Link>
                <span>
                  <FormattedMessage
                    id="common.following"
                    description="Info quantidade de usuário seguidos"
                  />
                </span>
              </li>
            </ul>
          </div>

          <div className="user-name">
            <h3>{user.name}</h3>
            <span>
              @
              {user.username}
            </span>
          </div>

          <div className="user-action-buttons">
            <Button color="secondary">
              <FormattedMessage id="common.follow" description="Seguir" />
            </Button>
            {/* 
            <Button color="primary">
              <FormattedMessage
                id="common.sendMessage"
                description="Enviar Mensagem"
              />
            </Button>*/}
          </div>
        </ProfileInfo>
      </ProfileHeader>
      <GridContainer style={{marginTop: 16}}>
        <GridItem xs={4} style={{paddingRight: 16}}>
          <Paper padding>
            <UserAbout>
              <h3>
                <FormattedMessage id="common.about" description="Sobre" />
              </h3>
              <p>
                Dolor proident irure sunt elit nostrud anim nostrud eiusmod
                nostrud nostrud Lorem adipisicing cillum. Ut labore ullamco
                laborum Lorem.
              </p>
              <ul>
                <li>
                  <LocationIcon />
                  <span>Nárnia</span>
                </li>
                <li>
                  <BirthIcon />
                  <span>00/00/0000</span>
                </li>
                <li>
                  <SiteIcon />
                  <span>
                    <a href="http://example.com" target="_black">
                      example.com
                    </a>
                  </span>
                </li>
              </ul>
            </UserAbout>
          </Paper>
        </GridItem>
        <GridItem xs={8}>
          <Paper style={{ marginBottom: 16, width: '100%' }}>
            <Tabs>
              <li className={path === '/:id' ? 'current' : ''}>
                <Link to="/user">Feed</Link>
              </li>
              <li className={path.includes('/:id/lists') ? 'current' : ''}>
                <Link to="/user/lists">Coleção</Link>
              </li>
              <li
                className={path.includes('/:id/contributions') ? 'current' : ''}
              >
                <Link to="/user/contributions">Contribuições</Link>
              </li>
              <li className={path.includes('/:id/following') ? 'current' : ''}>
                <Link to="/user/following">Seguindo</Link>
              </li>
              <li className={path.includes('/:id/followers') ? 'current' : ''}>
                <Link to="/user/followers">Seguidores</Link>
              </li>
            </Tabs>
          </Paper>

          <Suspense fallback={<p>Carregando</p>}>
            <Feed />
          </Suspense>
        </GridItem>
      </GridContainer>
    </Container>
  );
};
