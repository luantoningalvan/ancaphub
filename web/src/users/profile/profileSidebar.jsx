import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import loadImage from '../../utils/loadImage'
import Button from '@material-ui/core/Button';
import EditProfile from './editProfile'
import FolowIcon from '@material-ui/icons/PersonAdd'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'

export default function ProfileSidebar(props) {
  const { name, avatar, _id } = props.user
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  return (
    <Paper>

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
            {props.isUserLoggedProfile ? (
              <EditProfile data={props.user} />
            ) : (
                <Button variant="outlined" fullWidth>
                  <FolowIcon style={{ marginRight: '10px' }} /> Seguir
                  </Button>
              )}
          </Box>
        </Box>


        <MenuList>
          <MenuItem component={AdapterLink} to={`/usuario/${_id}/`}>Feed</MenuItem>
          <MenuItem component={AdapterLink} to={`/usuario/${_id}/seguidores`}>Seguidores</MenuItem>
          <MenuItem component={AdapterLink} to={`/usuario/${_id}/biblioteca`}>Biblioteca</MenuItem>
        </MenuList>
      </React.Fragment>

    </Paper>
  )
}