import React, { useEffect, Fragment } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Badge,
  Paper,
  Avatar,
  Divider
} from '@material-ui/core';
import {
  Check as CheckIcon,
  RateReview as RateIcon,
  PersonAdd as FollowIcon,
  DoneAll as DoneIcon
} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'is-empty';
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import ProfilePicture from '../../components/profile/profilePicture'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNotifications, markAsReadAllNotifications } from '../../actions/notificationActions';

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: `${theme.palette.secondary}`
  },
}))(Avatar);

const ContributionsPanel = props => {
  useEffect(() => props.fetchNotifications(), []);

  const notificationText = ({ type, sender, data }) => {
    switch (type) {
      case "approved_item":
        return (
          <>
            <ListItemIcon>
              <Avatar style={{ background: "#ffbc00" }}><CheckIcon /></Avatar>
            </ListItemIcon>
            <span>Sua contribuição <strong>'{data.title}'</strong> foi aprovada.</span>
          </>
        )
      case "rated_item":
        return (
          <>
            <ListItemIcon>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<SmallAvatar style={{ background: "#ffbc00" }}><RateIcon fontSize="inherit" style={{ fontSize: '12px' }} /></SmallAvatar>}
              >
                <ProfilePicture avatar={sender.avatar} height="40px" width="40px" />
              </Badge>
            </ListItemIcon>
            <span><strong>{sender.name}</strong> avaliou seu item <strong>'{data.title}'</strong></span>
          </>
        )
      case "user_followed":
        return (
          <>
            <ListItemIcon>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<SmallAvatar style={{ background: "#ffbc00" }}><FollowIcon fontSize="inherit" style={{ fontSize: '12px' }} /></SmallAvatar>}
              >
                <ProfilePicture avatar={sender.avatar} height="40px" width="40px" />
              </Badge>
            </ListItemIcon>
            <span><strong>{sender.name}</strong> começou a seguir você</span>
          </>
        )
      default:
        return (<></>)
    }
  };

  return (
    <Template>
      <Title title="Painel de Contribuições" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}>
        <Typography variant="h4" component="h2">
          Notificações
        </Typography>
        <IconButton
          variant="outlined"
          color="primary"
          onClick={() => props.markAsReadAllNotifications()}
        >
          <DoneIcon />
        </IconButton>
      </Box>

      <Paper>
        {!isEmpty(props.notifications) ? (
          <List>
            {props.notifications.map((notification, index) => (
              <Fragment key={notification._id}>
                {index > 0 && <Divider />}
                <ListItem>
                  {notificationText(notification)}
                </ListItem>
              </Fragment>
            ))}
          </List>
        ) : (
            <Paper>
              <Box p={2}>
                Nenhuma notificação não encontrada.
            </Box>
            </Paper>
          )}
      </Paper>
    </Template>
  );
};

const mapStateToProps = state => ({
  notifications: state.notifications.notifications
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchNotifications, markAsReadAllNotifications }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContributionsPanel);
