import React, { useEffect, Fragment } from 'react';

// Material-UI Components
import {
  Box,
  Typography,
  IconButton,
  List,
  Paper,
  Divider
} from '@material-ui/core';

// Material-UI Icons
import {
  DoneAll as DoneIcon
} from '@material-ui/icons'

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNotifications, markAsReadAllNotifications } from '../../actions/notificationActions';

//Other
import isEmpty from 'is-empty';

// Custom Components
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import Notification from '../../components/notifications/notification'
import LoadContent from '../../components/loaders/loadContent'

const Notifications = ({fetchNotifications, markAsReadAllNotifications, notifications}) => {
  useEffect(() => fetchNotifications(), [fetchNotifications]);
  useEffect(() => markAsReadAllNotifications(), [markAsReadAllNotifications]);

  return (
    <Template>
      <Title title="Notificações" />
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
          color="secondary"
          onClick={() => markAsReadAllNotifications()}
        >
          <DoneIcon />
        </IconButton>
      </Box>

      <Paper>
        <LoadContent loading={notifications.loading}>
          {!isEmpty(notifications) ? (
            <List>
              {notifications.map((notification, index) => (
                <Fragment key={notification._id}>
                  {index > 0 && <Divider />}
                  <Notification notification={notification} />
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
        </LoadContent>
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
)(Notifications);
