import React from 'react';
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { 
  GroupRounded as UsersIcon,
  LibraryBooksRounded as LibraryIcon,
  CreateRounded as PostsIcon,
  CalendarTodayRounded as EventsIcon,
} from '@material-ui/icons'
import Hero from '../../components/template/hero';
import TitleComponent from '../../components/template/titleComponent';

const useStyles = makeStyles(theme => ({
  infoCard: { 
    background: theme.palette.secondary.main, 
    color: 'white', 
    padding: '5px 0px',
  },
  infoCardIcon: {fontSize: '4em', paddingRight: 15, marginRight:15, borderRight: '1px solid rgba(0,0,0,.1)'},
  infoCardTitle: {fontWeight: 'lighter', fontSize: '1.2em', lineHeight: '100%', marginBottom:5},
  infoCardCount: {fontSize: '2.5em', lineHeight: '100%', fontWeight: 'bold'},
}))

export default function Dashboard() {
  const classes = useStyles()

  return (
    <>
      <TitleComponent title="Dashboard" />
      <Hero title="Dashboard (Em Construção)" />

      <Box mt={3}>
        <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.infoCard} elevation={0}>
              <Box p={2} display="flex" alignItems='center'>
                <UsersIcon className={classes.infoCardIcon}/>
                <div>
                <Typography component="h3" className={classes.infoCardTitle}>Usuários</Typography>
                <Typography component="span" className={classes.infoCardCount}>0</Typography>
                </div>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.infoCard} elevation={0}>
              <Box p={2} display="flex" alignItems='center'>
                <LibraryIcon className={classes.infoCardIcon}/>
                <div>
                <Typography component="h3" className={classes.infoCardTitle}>Itens na Biblioteca</Typography>
                <Typography component="span" className={classes.infoCardCount}>0</Typography>
                </div>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.infoCard} elevation={0}>
              <Box p={2} display="flex" alignItems='center'>
                <PostsIcon className={classes.infoCardIcon}/>
                <div>
                <Typography component="h3" className={classes.infoCardTitle}>Postagens</Typography>
                <Typography component="span" className={classes.infoCardCount}>0</Typography>
                </div>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.infoCard} elevation={0}>
              <Box p={2} display="flex" alignItems='center'>
                <EventsIcon className={classes.infoCardIcon}/>
                <div>
                <Typography component="h3" className={classes.infoCardTitle}>Eventos</Typography>
                <Typography component="span" className={classes.infoCardCount}>0</Typography>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        </Container>
      </Box>
    </>
  );
}
