import React from 'react';
import Chatbox from '../../components/ui/Chatbox';

const chats = [
  {
    name: 'Chat em grupo',
    lastMessage: {
      user: 'Zé Pequeté',
      body: 'Tô chegando com os refri, rapaziada',
      createdAt: 'agora',
    },
    messages: [
      {
        user: {
          name: 'Zé Pequeté',
        },
        body: 'Lorem ipsum dolor sit amet.',
        createdAt: '2h',
        sentByUser: false,
      },
      {
        user: {
          name: 'Você',
        },
        body: 'Consectetur adipiscing elit :P',
        createdAt: '1h',
        sentByUser: true,
      },
      {
        user: {
          name: 'Zé Pequeté',
        },
        body: 'Tô chegando com os refri, rapaziada',
        createdAt: 'agora',
        sentByUser: false,
      },
    ],
  },
];

export default () => (
  <Chatbox chats={chats} currentChat={chats[0]} showName />
);
