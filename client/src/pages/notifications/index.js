import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import DoneIcon from "react-ionicons/lib/IosDoneAll";
import { isEmpty } from "lodash";
import Container from "../../components/ui/Container";
import Hero from "../../components/ui/Hero";
import Paper from "../../components/ui/Paper";
import IconButton from "../../components/ui/IconButton";
import Notification from "../../components/notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationsRequest,
  markAllAsReadRequest,
} from "../../actions/notifications";

export default () => {
  const dispatch = useDispatch();
  const { notifications, loadingNotifications } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(getNotificationsRequest());
    dispatch(markAllAsReadRequest());
  }, []);

  return (
    <Container>
      <Hero
        title={
          <FormattedMessage
            id="common.notifications"
            description="Título da página de notificações"
          />
        }
      />

      <div style={{ marginTop: 16 }}>
        {!loadingNotifications ? (
          <>
            {!isEmpty(notifications) ? (
              <Paper>
                <ul style={{ padding: "8px 0px" }}>
                  {notifications.map((notification) => (
                    <Notification
                      notification={notification}
                      key={notification.id}
                    />
                  ))}
                </ul>
              </Paper>
            ) : (
              <Paper padding>Nenhuma notificação foi encontrada.</Paper>
            )}
          </>
        ) : (
          <p>Carregando</p>
        )}
      </div>
    </Container>
  );
};
