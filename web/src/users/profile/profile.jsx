import React, { useEffect } from 'react'
import Template from '../../template/template'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../userActions'
import { Link } from 'react-router-dom'
import loadImage from '../../utils/loadImage'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit'
import FolowIcon from '@material-ui/icons/PersonAdd'
import UserFeed from './userFeed'
import UserLibrary from './userLibrary'
import UserFollowers from './userFollowers'

function LoggedUserMenu(props) {
  const { id } = props.match.params
  const { name, avatar } = props.user.user
  const url = props.match.path
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  useEffect(() => props.getUser(id), [id]);

  const isUserLoggedProfile = () => (props.authUser.isAuthenticated && props.user.user._id == props.authUser.user._id)

  function showComponent() {
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

  return (
    <Template>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper>
            {!props.user.isLoading && !props.authUser.loading ? (
              <React.Fragment>
                <Box py={2} style={{ backgroundColor: "#f9a825" }}>
                  <Box display="flex" alignItems="center" flexDirection="column">
                    {
                      avatar && avatar != "" ? (
                        <Avatar src={avatar} alt={name} style={{ width: '120px', height: '120px', marginBottom: "10px" }} />
                      ) : (
                          <Avatar src={loadImage('defaultProfilePicture.png')} alt="Foto de perfil genérica" style={{ width: '120px', height: '120px', marginBottom: "10px" }} />
                        )
                    }
                    <Typography variant="h6">{name}</Typography>
                  </Box>
                  <Box mt={1} px={2}>
                    {isUserLoggedProfile() ? (
                      <Button variant="outlined" fullWidth>
                        <EditIcon style={{ marginRight: '10px' }} /> Editar Perfil
                      </Button>
                    ) : (
                        <Button variant="outlined" fullWidth>
                          <FolowIcon style={{ marginRight: '10px' }} /> Seguir
                      </Button>
                      )}
                  </Box>
                </Box>


                <MenuList>
                  <MenuItem component={AdapterLink} to={`/usuario/${id}/`}>Feed</MenuItem>
                  <MenuItem component={AdapterLink} to={`/usuario/${id}/seguidores`}>Seguidores</MenuItem>
                  <MenuItem component={AdapterLink} to={`/usuario/${id}/biblioteca`}>Biblioteca</MenuItem>
                </MenuList>
              </React.Fragment>
            ) : (
                <Box mx="auto">
                  <CircularProgress />
                </Box>
              )}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          {showComponent()}
        </Grid>
      </Grid>
    </Template>
  );
}

const mapStateToProps = state => ({ authUser: state.auth, user: state.users })
const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoggedUserMenu)
