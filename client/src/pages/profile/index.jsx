import React, { useEffect } from 'react';

// Material Components
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MaterialLink,
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

// Material Icons
import {
  LocationOn as LocationIcon,
  Link as SiteIcon,
  Cake as BirthDayIcon
} from '@material-ui/icons';

// Custom Components
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import UnavaliableContent from '../../components/error/unavaliableContent'
import ProfilePicture from '../../components/profile/profilePicture';
import EditProfile from '../../components/profile/editProfile';
import FollowButton from '../../components/profile/followButton';
import Loader from '../../components/loaders/loadingItems'
import LoadContent from '../../components/loaders/loadContent'

// Profile Pages
import UserFeed from './userFeed';
import UserLibrary from './userLibrary';
import UserContributions from './userContributions';
import UserFollowers from './userFollowers';
import UserFollowing from './userFollowing';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../actions/userActions';

// Others
import { Link } from 'react-router-dom';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  icon: {
    minWidth: '34px',
    color: 'inherit'
  },
  infoText: { overflow: "hidden" }
}));

function Profile({ getUser, auth, user, match}) {
  const classes = useStyles()
  const { id } = match.params
  useEffect(() => getUser(id), [getUser, id])

  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  const {
    _id,
    username,
    bio,
    site,
    birthday,
    currentCity,
    avatar,
    followersCount,
    followingCount
  } = user.user || {};
  const isUserLoggedProfile =
    auth.isAuthenticated &&
    user.user &&
    user.user._id === auth.user._id;

  function showComponent() {
    if (!user.isLoading && !auth.loading) {
      switch (match.path) {
        case '/:id':
          return (
            <UserFeed
              user={user.user}
              isUserLoggedProfile={isUserLoggedProfile}
            />
          );
        case '/:id/followers':
          return <UserFollowers user={user.user} />;
        case '/:id/following':
          return <UserFollowing user={user.user} />;
        case '/:id/library':
          return <UserLibrary user={user.user} />;
        case '/:id/contributions':
          return <UserContributions user={user.user} />;
        default:
          console.log(match.path);
      }
    } else {
      return (
        <Loader />
      );
    }
  }

  return (
    <Template>
      <LoadContent loading={user.loading}>
        {user.user === null ? (
          <UnavaliableContent />
        ) : (
            <>
              <Title title={username} />
              <Grid container spacing={4}>
                <Grid item xs={12} sm={5} md={4} lg={3}>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    textAlign="center"
                  >
                    <ProfilePicture
                      avatar={avatar}
                      width="120px"
                      height="120px"
                    />
                    <Box my={2}>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>{username}</Typography>
                      <Typography variant="body2">{bio}</Typography>
                    </Box>
                    <Box display="flex">
                      <div
                        style={{
                          paddingRight: '15px',
                          borderRight: '1px solid #d8d8d8'
                        }}>
                        <MaterialLink
                          component={AdapterLink}
                          color="textPrimary"
                          to={`/${_id}/following`}>
                          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                            {followingCount}
                          </Typography>
                          <Typography variant="subtitle2">Seguindo</Typography>
                        </MaterialLink>
                      </div>
                      <div style={{ paddingLeft: '15px' }}>
                        <MaterialLink
                          component={AdapterLink}
                          color="textPrimary"
                          to={`/${_id}/followers`}>
                          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                            {followersCount}
                          </Typography>
                          <Typography variant="subtitle2">Seguidores</Typography>
                        </MaterialLink>
                      </div>
                    </Box>
                  </Box>
                  {(currentCity || site || birthday) && (
                    <Box mt={2}>
                      <List disablePadding>
                        {currentCity && (
                          <ListItem>
                            <ListItemIcon classes={{ root: classes.icon }}>
                              <LocationIcon className={classes.infoIcon} />
                            </ListItemIcon>
                            <ListItemText primary={currentCity} className={classes.infoText} />
                          </ListItem>
                        )}

                        {site && (
                          <ListItem>
                            <ListItemIcon classes={{ root: classes.icon }}>
                              <SiteIcon className={classes.infoIcon} />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <MaterialLink target="_blank" href={site} color="textPrimary">
                                  {site}
                                </MaterialLink>
                              }
                              className={classes.infoText}
                            />
                          </ListItem>
                        )}

                        {birthday && (
                          <ListItem>
                            <ListItemIcon classes={{ root: classes.icon }}>
                              <BirthDayIcon className={classes.infoIcon} />
                            </ListItemIcon>
                            <ListItemText className={classes.infoText} primary={moment(birthday).locale('pt-br').format('L')} />
                          </ListItem>
                        )}
                      </List>
                    </Box>
                  )}
                  <Box mt={2} px={2}>
                    {auth.isAuthenticated && (
                      <React.Fragment>
                        {isUserLoggedProfile ? (
                          <EditProfile data={user.user} />
                        ) : (
                            <FollowButton profile={user.user} />
                          )}
                      </React.Fragment>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={7} md={8} lg={9}>
                  <Tabs
                    indicatorColor="secondary"
                    textColor="secondary"
                    value={match.path}>
                    <Tab
                      component={AdapterLink}
                      to={`/${_id}/`}
                      label="Feed"
                      value="/:id"
                    />
                    <Tab
                      component={AdapterLink}
                      to={`/${_id}/library`}
                      label="Coleção"
                      value="/:id/library"
                    />
                    <Tab
                      component={AdapterLink}
                      to={`/${_id}/contributions`}
                      label="Contribuições"
                      value="/:id/contributions"
                    />
                  </Tabs>

                  <Box py={2}>{showComponent()}</Box>
                </Grid>
              </Grid>
            </>
          )}
      </LoadContent>
    </Template>
  );
}

const mapStateToProps = state => ({ auth: state.auth, user: state.users });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
