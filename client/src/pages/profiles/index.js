import React, { lazy, Suspense, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import LocationIcon from "react-ionicons/lib/IosPinOutline";
import BirthIcon from "react-ionicons/lib/IosEggOutline";
import SiteIcon from "react-ionicons/lib/IosLinkOutline";
import defaultProfilePicture from "../../assets/default-profile-picture.jpg";
import defaultProfileCover from "../../assets/default-profile-cover.jpg";
import Paper from "../../components/ui/Paper";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import FollowButton from '../../components/users/FollowButton'
import { getSingleUserRequest } from "../../actions/users";
import {
  ProfileHeader,
  ProfileCover,
  ProfilePicture,
  ProfileInfo,
  UserAbout,
  Tabs,
} from "./styles.css";
import { useState } from "react";

const Feed = lazy(() => import("./Feed"));
const Lists = lazy(() => import("./Lists"));
const Contributions = lazy(() => import("./Contributions"));
const Followers = lazy(() => import("./Followers"));
const Following = lazy(() => import("./Following"));

export default () => {
  const { user, loading } = useSelector((state) => state.profile);
  const [Page, setPage] = useState()
  const counts = useSelector((state) => state.usersCount);
  const { id: userId, page: pageParam } = useParams();
  const dispatch = useDispatch();

  const pages = {
    "undefined": <Feed user={userId} />,
    "lists": <Lists />,
    "contributions": <Contributions />,
    "followers": <Followers user={userId} />,
    "following": <Following user={userId} />,
  };

  useEffect(() => {
    dispatch(getSingleUserRequest(userId));
  }, [userId, getSingleUserRequest]);


  useEffect(() => {
    setPage(() => pages[pageParam])
  }, [pageParam]);

  return (
    <Container>
      {loading ? (
        <p>Carregando</p>
      ) : (
        <>
          <ProfileHeader>
            <ProfileCover>
              <img src={defaultProfileCover} alt="default cover pic" />
            </ProfileCover>
            <ProfilePicture>
              <img
                src={
                  user.avatar && user.avatar !== ""
                    ? user.avatar
                    : defaultProfilePicture
                }
                alt="default profile pic"
              />
            </ProfilePicture>
            <ProfileInfo>
              <div className="follower-count">
                <ul>
                  <li>
                    <Link to={`/${userId}/followers`} className="counter">
                      {counts[userId] ? counts[userId].followersCount : 0}
                    </Link>
                    <span>
                      <FormattedMessage
                        id="common.followers"
                        description="Info quantidade de seguidores"
                      />
                    </span>
                  </li>
                  <li>
                    <Link to={`/${userId}/following`}className="counter">
                      {counts[userId] ? counts[userId].followingCount : 0}
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
                <span>@{user.username}</span>
              </div>

              <div className="user-action-buttons">
              <FollowButton user={userId}/>
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
          <GridContainer style={{ marginTop: 16 }} spacing={2}>
            <GridItem xs={4}>
              <Paper padding style={{ width: "100%" }}>
                <UserAbout>
                  <h3>
                    <FormattedMessage id="common.about" description="Sobre" />
                  </h3>
                  {user.bio && <p>{user.bio}</p>}

                  <ul>
                    {user.location && (
                      <li>
                        <LocationIcon />
                        <span>{user.location}</span>
                      </li>
                    )}

                    {user.birthday && (
                      <li>
                        <BirthIcon />
                        <span>{user.birthday}</span>
                      </li>
                    )}

                    {user.site && (
                      <li>
                        <SiteIcon />
                        <span>
                          <a href="http://example.com" target="_black">
                            {user.site}
                          </a>
                        </span>
                      </li>
                    )}
                  </ul>
                </UserAbout>
              </Paper>
            </GridItem>
            <GridItem xs={8}>
              <Paper style={{ width: "100%" }}>
                <Tabs>
                  <li className={pageParam == undefined ? "current" : ""}>
                    <Link to={`/${userId}`}>Feed</Link>
                  </li>
                  <li className={pageParam == "lists" ? "current" : ""}>
                    <Link to={`/${userId}/lists`}>Listas</Link>
                  </li>
                  <li className={pageParam == "contributions" ? "current" : ""}>
                    <Link to={`/${userId}/contributions`}>Contribuições</Link>
                  </li>
                  <li className={pageParam == "following" ? "current" : ""}>
                    <Link to={`/${userId}/following`}>Seguindo</Link>
                  </li>
                  <li className={pageParam == "followers" ? "current" : ""}>
                    <Link to={`/${userId}/followers`}>Seguidores</Link>
                  </li>
                </Tabs>
              </Paper>

              <div style={{ width: '100%', margin: '16px 0px'}}>
              <Suspense fallback={<p>Carregando</p>}>
                {Page}
              </Suspense>
              </div>

            </GridItem>
          </GridContainer>
        </>
      )}
    </Container>
  );
};
