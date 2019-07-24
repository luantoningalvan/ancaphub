import React, { useEffect } from 'react'
import Template from '../../template/template'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../userActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import UserFeed from './userFeed'
import UserLibrary from './userLibrary'
import UserFollowers from './userFollowers'
import ProfileSidebar from './profileSidebar'
import { Typography } from '@material-ui/core';

function LoggedUserMenu(props) {
  const { id } = props.match.params
  const url = props.match.path

  useEffect(() => props.getUser(id), [id]);

  function showComponent() {
    const isUserLoggedProfile = () => (props.authUser.isAuthenticated && props.user.user._id == props.authUser.user._id)

    if (!props.user.isLoading && !props.authUser.loading) {
      switch (url) {
        case '/usuario/:id':
          return (<UserFeed user={props.user.user} isUserLoggedProfile={isUserLoggedProfile()} />)
        case '/usuario/:id/seguidores':
          return (<UserFollowers />)
        case '/usuario/:id/biblioteca':
          return (<UserLibrary authUser={props.authUser.user} />)
        default:
          console.log(props.match.path)
      }
    } else {
      return (
        <Box mx="auto">
          <CircularProgress />
        </Box>
      )
    }
  }

  function showProfile() {
    if (!props.user.isLoading && !props.authUser.loading) {
      return (
        <ProfileSidebar user={props.user.user} auth={props.authUser} />
      )
    } else {
      return (
        <Box mx="auto">
          <CircularProgress />
        </Box>
      )
    }
  }

  return (
    <Template>

      {props.user.user != null ? (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {showProfile()}
          </Grid>
          <Grid item xs={9}>
            {showComponent()}
          </Grid>
        </Grid>
      ) : (
          <Box justifyContent="center" alignItems="center" width={1}>
            <Typography variant="h4">Erro 404</Typography>
            <Typography variant="body2">Perfil Não Encontrado</Typography>
          </Box>

        )}

    </Template >
  );
}

const mapStateToProps = state => ({ authUser: state.auth, user: state.users })
const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoggedUserMenu)
