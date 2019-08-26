import React from 'react'
import Typography from '@material-ui/core/Typography'
import ProfilePicture from '../../../components/profilePicture'
import Paper from '@material-ui/core/Paper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import EditProfile from './editProfile'
import FollowButton from './followButton'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialLink from '@material-ui/core/Link';
import LocationIcon from '@material-ui/icons/LocationOn'
import SiteIcon from '@material-ui/icons/Link'
import BirthDayIcon from '@material-ui/icons/Cake'

export default function ProfileSidebar(props) {
  const { name, bio, site, birthday, location, avatar, _id } = props.user
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  const isUserLoggedProfile = props.auth.isAuthenticated && props.user._id == props.auth.user._id
  return (
    <Paper>

      <React.Fragment>
        <Box py={2} style={{ backgroundColor: "#f9a825" }}>
          <Box display="flex" alignItems="center" flexDirection="column" px={2} textAlign="center">
            <ProfilePicture avatar={avatar} width="120px" height="120px" />
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2">{bio}</Typography>
          </Box>
          <Box mt={1}>
            <List dense>
              {location && (
                <ListItem>
                  <ListItemIcon style={{ minWidth: '34px' }}>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={location}
                  />
                </ListItem>
              )}

              {site && (
                <ListItem>
                  <ListItemIcon style={{ minWidth: '34px' }}>
                    <SiteIcon />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                  >
                    <MaterialLink target="_blank" href={site}>{site}</MaterialLink>
                  </ListItemText>
                </ListItem>
              )}

              {birthday && (
                <ListItem>
                  <ListItemIcon style={{ minWidth: '34px' }}>
                    <BirthDayIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={birthday.substring(0, 10)}
                  />
                </ListItem>
              )}

            </List>
          </Box>
          <Box mt={1} px={2}>
            {props.auth.isAuthenticated && (
              <React.Fragment>
                {isUserLoggedProfile ? (
                  <EditProfile data={props.user} />
                ) : (
                    <FollowButton profile={props.user} />
                  )}
              </React.Fragment>
            )}

          </Box>
        </Box>


        <MenuList>
          <MenuItem component={AdapterLink} to={`/usuario/${_id}/`}>Feed</MenuItem>
          <MenuItem component={AdapterLink} to={`/usuario/${_id}/seguidores`}>Seguidores</MenuItem>
          <MenuItem component={AdapterLink} to={`/usuario/${_id}/colecao`}>Coleção</MenuItem>
        </MenuList>
      </React.Fragment>

    </Paper>
  )
}