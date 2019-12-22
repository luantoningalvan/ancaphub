
import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchGroup } from '../../../actions/groupActions'
import Template from '../../../components/template';
import Title from '../../../components/template/titleComponent'
import Loader from '../../../components/loaders/loadingItems'
import LoadContent from '../../../components/loaders/loadContent'
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
    height: 64,
    width: 'calc(100% - 240px)',
    position: 'fixed',
  },
  tabContent: {
    marginTop: 64
  }
}))

const SingleGroup = props => {
  const classes = useStyles()

  useEffect(() => {
    props.fetchGroup(props.match.params.id)
  }, [])

  function showComponent() {
    if (!props.groups.loading) {
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
      <LoadContent loading={props.groups.loading}>
        <Title title="Grupo Individual" />
        <Toolbar className={classes.groupHeader}>
          <Typography variant="h6" component="h2">
            {props.groups.group.name}
          </Typography>

          <Tabs value={props.match.path}>
            <Tab component={Link} to={`/groups/${props.groups.group._id}/`} value="/groups/:id" label="Mural"></Tab>
            <Tab component={Link} to={`/groups/${props.groups.group._id}/chat`} value="/groups/:id/chat" label="Chat"></Tab>
            <Tab component={Link} to={`/groups/${props.groups.group._id}/files`} value="/groups/:id/files" label="Arquivos"></Tab>
            <Tab component={Link} to={`/groups/${props.groups.group._id}/members`} value="/groups/:id/members" label="Membros"></Tab>
          </Tabs>
        </Toolbar>
        <Box className={classes.tabContent}>
          {showComponent()}
        </Box>
      </LoadContent>
    </Template>
  )
};

const mapStateToProps = state => ({ groups: state.groups })
const mapDisptachToProps = dispatch => bindActionCreators({ fetchGroup }, dispatch)

export default connect(mapStateToProps, mapDisptachToProps)(SingleGroup)