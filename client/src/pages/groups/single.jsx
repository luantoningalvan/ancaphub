import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Tabs,
  Tab,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import PostNewStatus from '../../components/posts/postNewStatus';
import ShowPosts from '../../components/posts/showPosts';
import image from '../../assets/images/1.jpg'

const useStyles = makeStyles(theme => ({
  groupHeader: {
    display: 'flex', 
    justifyContent: "space-between", 
    background: theme.palette.primary.main
  },
  groupCover: {
    borderRadius: 10,
    background: `url(${image})`,
    height: 250,
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition:'center'
  }
}))
export default props => {
  const classes = useStyles()
  return (
    <Template noPadding>
      <Title title="Grupo Individual" />

      <Toolbar className={classes.groupHeader}>
        <Typography variant="h6" component="h2" style={{ color: 'white' }}>
          Nome do Grupo
        </Typography>
        <Tabs value="0">
          <Tab value="0" label="Mural"></Tab>
          <Tab value="1" label="Chat"></Tab>
          <Tab value="1" label="Arquivos"></Tab>
          <Tab value="2" label="Membros"></Tab>
        </Tabs>
      </Toolbar>

      <Container>
        <Box className={classes.groupCover} my={2}></Box>
        <Grid container justify="center">
          <Grid item xs={8}>
            <PostNewStatus />
            <ShowPosts posts={{}} />
          </Grid>
        </Grid>
      </Container>
    </Template>
  )
};
