import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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

import UserFeed from './userFeed'
import UserLibrary from './userLibrary'
import UserFollowers from './userFollowers'

function LoggedUserMenu(props) {
  const { id } = props.match.params
  const url = props.match.path
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  useEffect(() => props.getUser(id), []);

  function showComponent(){
    switch (url) {
      case '/usuario/:id':
        return (<UserFeed />)
      case '/usuario/:id/seguidores':
        return (<UserFollowers />)
      case '/usuario/:id/biblioteca':
        return (<UserLibrary />)
      default:
        console.log(props.match.path)
    }
  }

  return (
    <Template>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <Box display="flex" alignItems="center" flexDirection="column" py={2} style={{ backgroundColor: "#f9a825" }}>
              <Avatar src={loadImage('defaultProfilePicture.png')} style={{ width: '120px', height: '120px', marginBottom: "10px" }} />
              <Typography variant="h6">{props.user.name}</Typography>
            </Box>

            <MenuList>
              <MenuItem component={AdapterLink} to={`/usuario/${id}/`}>Feed</MenuItem>
              <MenuItem component={AdapterLink} to={`/usuario/${id}/seguidores`}>Seguidores</MenuItem>
              <MenuItem component={AdapterLink} to={`/usuario/${id}/biblioteca`}>Biblioteca</MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          {showComponent()}
        </Grid>
      </Grid>
    </Template>
  );
}

const mapStateToProps = state => ({ user: state.users.user })
const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoggedUserMenu)
