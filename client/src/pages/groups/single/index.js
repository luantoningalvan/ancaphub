
import React from 'react';
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Template from '../../../components/template';
import Title from '../../../components/template/titleComponent'
import Loader from '../../../components/loaders/loadingItems'
import Wall from './wall'
import Chat from './chat'
import Files from './files'
import Members from './members'

const useStyles = makeStyles(theme => ({
  groupBox: {
    display: 'block',
    height: '100%',
    width: 'calc(100% - 240px)',
    display: 'flex',
    flexDirection: 'column'
  },
  groupHeader: {
    display: 'flex',
    justifyContent: "space-between",
    height:64,
    width: 'calc(100% - 240px)',
    position: 'fixed',
    background: '#0240d4',
    color:  'white'
  },
  tabContent: {
    marginTop: 64
  }
}))

export default props => {
  const classes = useStyles()

  function showComponent() {
    if (true) {
      switch (props.match.path) {
        case '/groups/:id':
          return <Wall />;
        case '/groups/:id/chat':
          return <Chat />;
        case '/groups/:id/files':
          return <Files />;
        case '/groups/:id/members':
          return <Members />;
        default:
          console.log(props.match.path);
      }
    } else {
      return (
        <Box mx="auto" my="auto">
          <Loader />
        </Box>
      );
    }
  }

  return (
    <Template noPadding>
      <Title title="Grupo Individual" />
        <Toolbar className={classes.groupHeader}>
          <Typography variant="h6" component="h2">
            Nome do Grupo
        </Typography>
          <Tabs value={props.match.path}>
            <Tab component={Link} to={`/groups/${'fodase'}/`} value="/groups/:id" label="Mural"></Tab>
            <Tab component={Link} to={`/groups/${'fodase'}/chat`} value="/groups/:id/chat" label="Chat"></Tab>
            <Tab component={Link} to={`/groups/${'fodase'}/files`} value="/groups/:id/files" label="Arquivos"></Tab>
            <Tab component={Link} to={`/groups/${'fodase'}/members`} value="/groups/:id/members" label="Membros"></Tab>
          </Tabs>
        </Toolbar>
        <Box className={classes.tabContent}>
          {showComponent()}
        </Box>
    </Template>
  )
};
