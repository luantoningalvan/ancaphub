import React from 'react';
import Container from '../../components/ui/Container';
import Chatbox from '../../components/ui/Chatbox';

// i18n
// import { FormattedMessage } from "react-intl";

// Just for prototyping and design purpose. Components will be properly edited later
const chats = [
  {
    name: 'Zé Pequeté',
    lastMessage: {
      body: 'Tô chegando com os refri, rapaziada',
      time: 'agora',
    },
    messages: [
      {
        body: 'Lorem ipsum dolor sit amet.',
        time: '2h',
        sentByUser: false,
      },
      {
        body: 'Consectetur adipiscing elit :P',
        time: '1h',
        sentByUser: true,
      },
      {
        body: 'Tô chegando com os refri, rapaziada',
        time: 'agora',
      },
    ],
  },
  {
    name: 'Cosmo',
    lastMessage: {
      body: 'Ou será que não?',
      time: '2h',
    },
  },
  {
    name: 'Ancapitão',
    lastMessage: {
      body: 'É hora de salvar o mundo',
      time: '5h',
    },
  },
];

export default (props) => (
  <Container>
    <Chatbox chats={chats} currentChat={chats[0]} />
  </Container>
);
