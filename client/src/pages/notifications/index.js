import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import DoneIcon from 'react-ionicons/lib/IosDoneAll';
import { isEmpty } from 'lodash';
import Container from '../../components/ui/Container';
import Hero from '../../components/ui/Hero';
import Paper from '../../components/ui/Paper';
import IconButton from '../../components/ui/IconButton';
import Notification from '../../components/notifications';

export default (props) => {
  const notifications = [
    {
      type: 'comment_liked',
      date: '15 minutes ago',
      data: {
        _id: 'as89d6as89d',
        name: 'Juvenal',
        avatar: 'https://scontent.fcxj1-1.fna.fbcdn.net/v/t1.0-1/cp0/p60x60/48398163_2319668251441959_894053401791299584_o.jpg?_nc_cat=102&_nc_sid=7206a8&_nc_ohc=22EwmYT73icAX-8zWeF&_nc_ht=scontent.fcxj1-1.fna&oh=e65c76be58608fc5b90f0ca1c51a17d4&oe=5EA4AD55',
      },
    },
    {
      type: 'post_commented',
      date: '15 minutes ago',
      data: {
        _id: 'as89d6as89d',
        name: 'Juvenal',
        avatar: 'https://scontent.fcxj1-1.fna.fbcdn.net/v/t1.0-1/cp0/p60x60/48398163_2319668251441959_894053401791299584_o.jpg?_nc_cat=102&_nc_sid=7206a8&_nc_ohc=22EwmYT73icAX-8zWeF&_nc_ht=scontent.fcxj1-1.fna&oh=e65c76be58608fc5b90f0ca1c51a17d4&oe=5EA4AD55',
      },
    },
    {
      type: 'post_shared',
      date: '15 minutes ago',
      data: {
        _id: 'as89d6as89d',
        name: 'Juvenal',
        avatar: 'https://scontent.fcxj1-1.fna.fbcdn.net/v/t1.0-1/cp0/p60x60/48398163_2319668251441959_894053401791299584_o.jpg?_nc_cat=102&_nc_sid=7206a8&_nc_ohc=22EwmYT73icAX-8zWeF&_nc_ht=scontent.fcxj1-1.fna&oh=e65c76be58608fc5b90f0ca1c51a17d4&oe=5EA4AD55',
      },
    },
    {
      type: 'user_followed',
      date: '15 minutes ago',
      data: {
        _id: 'as89d6as89d',
        name: 'Juvenal',
        avatar: 'https://scontent.fcxj1-1.fna.fbcdn.net/v/t1.0-1/cp0/p60x60/48398163_2319668251441959_894053401791299584_o.jpg?_nc_cat=102&_nc_sid=7206a8&_nc_ohc=22EwmYT73icAX-8zWeF&_nc_ht=scontent.fcxj1-1.fna&oh=e65c76be58608fc5b90f0ca1c51a17d4&oe=5EA4AD55',
      },
    },
  ];

  return (
    <Container>
      <Hero
        title={(
          <FormattedMessage
            id="common.notifications"
            description="Título da página de notificações"
          />
        )}
        actions={(
          <IconButton
            variant="outlined"
            color="secondary"
            onClick={() => { }}
          >
            <DoneIcon />
          </IconButton>
        )}
      />

      <div style={{ marginTop: 15 }}>
        {!isEmpty(notifications) ? (
          <Paper>
            <ul style={{ padding: '8px 0px' }}>
              {notifications.map((notification, index) => (
                <Notification notification={notification} key={index} />
              ))}
            </ul>
          </Paper>
        ) : (
          <Paper padding>
            Nenhuma notificação não encontrada.
          </Paper>
        )}
      </div>
    </Container>
  );
};
