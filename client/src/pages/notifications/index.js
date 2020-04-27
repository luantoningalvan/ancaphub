import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/ui/Container';
import Hero from '../../components/ui/Hero';
import Paper from '../../components/ui/Paper';
import Loader from '../../components/ui/Loader';
import Notification from '../../components/notifications';
import {
  getNotificationsRequest,
  markAllAsReadRequest,
} from '../../actions/notifications';

export default () => {
  const dispatch = useDispatch();
  const { notifications, loadingNotifications } = useSelector(
    (state) => state.notifications,
  );

  useEffect(() => {
    dispatch(getNotificationsRequest());
    dispatch(markAllAsReadRequest());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Hero
        title={(
          <FormattedMessage
            id="common.notifications"
            description="Título da página de notificações"
          />
        )}
      />

      <div style={{ marginTop: 16 }}>
        {!loadingNotifications ? (
          <>
            {!isEmpty(notifications) ? (
              <Paper>
                <ul style={{ padding: '8px 0px' }}>
                  {notifications.map((notification) => (
                    <Notification
                      notification={notification}
                      key={notification.id}
                    />
                  ))}
                </ul>
              </Paper>
            ) : (
              <Paper padding>
                <FormattedMessage id="notifications.noneFound" />
              </Paper>
            )}
          </>
        ) : (
          <Paper padding style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader />
          </Paper>
        )}
      </div>
    </Container>
  );
};
