import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import ProfilePicture from '../../../components/profilePicture';
import Grid from '@material-ui/core/Grid';
import EditProfile from './editProfile';
import FollowButton from './followButton';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialLink from '@material-ui/core/Link';
import LocationIcon from '@material-ui/icons/LocationOn';
import SiteIcon from '@material-ui/icons/Link';
import BirthDayIcon from '@material-ui/icons/Cake';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Template from '../../../template/template';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../userActions';

import UserFeed from './userFeed';
import UserCollection from './userCollection';
import UserContributions from './userContributions';
import UserFollowers from './userFollowers';
import UserFollowing from './userFollowing';

function Profile(props) {
  useEffect(() => props.getUser(props.match.params.id), [
    props.match.params.id
  ]);

  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  const {
    _id,
    name,
    bio,
    site,
    birthday,
    currentCity,
    avatar,
    followersCount,
    followingCount
  } = props.user.user || {};
  const isUserLoggedProfile =
    props.auth.isAuthenticated &&
    props.user.user &&
    props.user.user._id == props.auth.user._id;

  function showComponent() {
    if (!props.user.isLoading && !props.auth.loading) {
      switch (props.match.path) {
        case '/usuario/:id':
          return (
            <UserFeed
              user={props.user.user}
              isUserLoggedProfile={isUserLoggedProfile}
            />
          );
        case '/usuario/:id/followers':
          return <UserFollowers user={props.user.user} />;
        case '/usuario/:id/following':
          return <UserFollowing user={props.user.user} />;
        case '/usuario/:id/collection':
          return <UserCollection user={props.user.user} />;
        case '/usuario/:id/contributions':
          return <UserContributions user={props.user.user} />;
        default:
          console.log(props.match.path);
      }
    } else {
      return (
        <Box mx="auto" my="auto">
          <CircularProgress />
        </Box>
      );
    }
  }

  return (
    <Template>
      {props.user.user == null ? (
        <Box
          justifyContent="center"
          alignItems="center"
          width={1}
          height="100%">
          <Typography variant="h4">Erro 404</Typography>
          <Typography variant="body2">Perfil Não Encontrado</Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              textAlign="center">
              <ProfilePicture
                avatar={avatar}
                width="120px"
                height="120px"
                style={{ marginBottom: '10px' }}
              />
              <Typography variant="h6">{name}</Typography>
              <Typography variant="body2">{bio}</Typography>
              <Box display="flex" mt={3}>
                <div
                  style={{
                    paddingRight: '15px',
                    borderRight: '1px solid #d8d8d8'
                  }}>
                  <MaterialLink
                    component={AdapterLink}
                    to={`/usuario/${_id}/following`}>
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                      {followingCount}
                    </Typography>
                    <Typography variant="subtitle2">Seguindo</Typography>
                  </MaterialLink>
                </div>
                <div style={{ paddingLeft: '15px' }}>
                  <MaterialLink
                    component={AdapterLink}
                    to={`/usuario/${_id}/followers`}>
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
                      <ListItemIcon style={{ minWidth: '34px' }}>
                        <LocationIcon />
                      </ListItemIcon>
                      <ListItemText primary={currentCity} />
                    </ListItem>
                  )}

                  {site && (
                    <ListItem>
                      <ListItemIcon style={{ minWidth: '34px' }}>
                        <SiteIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <MaterialLink target="_blank" href={site}>
                            {site}
                          </MaterialLink>
                        }
                      />
                    </ListItem>
                  )}

                  {birthday && (
                    <ListItem>
                      <ListItemIcon style={{ minWidth: '34px' }}>
                        <BirthDayIcon />
                      </ListItemIcon>
                      <ListItemText primary={birthday.substring(0, 10)} />
                    </ListItem>
                  )}
                </List>
              </Box>
            )}
            <Box mt={2} px={2}>
              {props.auth.isAuthenticated && (
                <React.Fragment>
                  {isUserLoggedProfile ? (
                    <EditProfile data={props.user.user} />
                  ) : (
                    <FollowButton profile={props.user.user} />
                  )}
                </React.Fragment>
              )}
            </Box>
          </Grid>

          <Grid item xs={9}>
            <Tabs
              indicatorColor="secondary"
              textColor="primary"
              value={props.match.path}>
              <Tab
                component={AdapterLink}
                to={`/usuario/${_id}/`}
                label="Feed"
                value="/usuario/:id"
              />
              <Tab
                component={AdapterLink}
                to={`/usuario/${_id}/collection`}
                label="Coleção"
                value="/usuario/:id/collection"
              />
              <Tab
                component={AdapterLink}
                to={`/usuario/${_id}/contributions`}
                label="Contribuições"
                value="/usuario/:id/contributions"
              />
            </Tabs>

            <Box py={2}>{showComponent()}</Box>
          </Grid>
        </Grid>
      )}
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
