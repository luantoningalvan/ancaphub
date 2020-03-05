import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Paper from "../../components/ui/Paper";
import defaultProfileCover from "../../assets/default-profile-cover.jpg";
import defaultProfilePicture from "../../assets/default-profile-picture.jpg";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

// i18n
import { FormattedMessage } from "react-intl";

// Icons
import LocationIcon from "react-ionicons/lib/IosPinOutline";
import BirthIcon from "react-ionicons/lib/IosEggOutline";
import SiteIcon from "react-ionicons/lib/IosLinkOutline";

// Areas
const Feed = lazy(() => import("./Feed"));
const Collection = lazy(() => import("./Collection"));
const Contributions = lazy(() => import("./Contributions"));
const Followers = lazy(() => import("./Followers"));
const Following = lazy(() => import("./Following"));

const ProfileHeader = styled.div`
  width: 100%;
  background: ${props => props.theme.pallete.paper};
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
          background-color: #2f3749;
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
          color: ${props => props.theme.pallete.text.secondary};
        }
        > .counter {
          text-decoration: none;
          font-weight: bold;
          font-size: 1.375rem;
          color: ${props => props.theme.pallete.text.primary};
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
    }
    > span {
      font-size: 0.9rem;
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
    color: white;
  }
  > ul li svg {
    float: left;
    fill: white;
    margin-right: 10px;
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1em;
  margin: 1em 0;
`;

const Tabs = styled.ul`
  display: flex;

  > li {
    list-style: none;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid rgba(0, 0, 0, 0.2);
    }
  }

  > li.current {
    border-bottom: 3px solid ${props => props.theme.pallete.secondary};
  }
  > li a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 16px 32px;
  }
`;

export default props => {
  const { path } = useRouteMatch();

  return (
    <Container>
      <ProfileHeader>
        <ProfileCover>
          <img src={defaultProfileCover} />
        </ProfileCover>
        <ProfilePicture>
          <img src={defaultProfilePicture} />
        </ProfilePicture>
        <ProfileInfo>
          <div className="follower-count">
            <ul>
              <li>
                <Link to="/user/followers" className="counter">
                  500
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
                  500
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
            <h3>Nome da Criatura</h3>
            <span>@arroba</span>
          </div>

          <div className="user-action-buttons">
            <Button color="secondary">
              <FormattedMessage id="common.follow" description="Seguir" />
            </Button>
            <Button>
              <FormattedMessage
                id="common.sendMessage"
                description="Enviar Mensagem"
              />
            </Button>
          </div>
        </ProfileInfo>
      </ProfileHeader>
      <ProfileContent>
        <div>
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
        </div>
        <div>
          <Paper style={{ marginBottom: 15 }}>
            <Tabs>
              <li className={path === "/:id" ? "current" : ""}>
                <Link to="/user">Feed</Link>
              </li>
              <li className={path.includes("/:id/collection") ? "current" : ""}>
                <Link to="/user/collection">Coleção</Link>
              </li>
              <li
                className={path.includes("/:id/contributions") ? "current" : ""}
              >
                <Link to="/user/contributions">Contribuições</Link>
              </li>
              <li className={path.includes("/:id/following") ? "current" : ""}>
                <Link to="/user/following">Seguindo</Link>
              </li>
              <li className={path.includes("/:id/followers") ? "current" : ""}>
                <Link to="/user/followers">Seguidores</Link>
              </li>
            </Tabs>
          </Paper>

          <Suspense fallback={<p>Carregando</p>}>
            <Feed />
          </Suspense>
        </div>
      </ProfileContent>
    </Container>
  );
};
