import React, { useState } from 'react'
import { Box, Grid, Typography, Tabs, Tab, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views';
import Login from '../../components/auth/login';
import Signup from '../../components/auth/signup';
import Title from '../../components/template/titleComponent'
import {
  FolderOutlined as LibraryIcon,
  GroupOutlined as GroupIcon,
  EventOutlined as EventIcon,
  LocationSearching as LocationSearchIcon
} from '@material-ui/icons';

const useStyles = makeStyles({
  features: {
    margin: 0,
    padding: 0
  },
  feature: {
    listStyle: 'none',
    fontSize: 21,
    padding: '5px 0px',
    display: 'flex',
    alignItems: 'center'
  },
  featureIcon: {
    marginRight: 10,
  }
})

const Home = props => {
  const [value, setValue] = useState(0);
  const classes = useStyles()
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <Container>
      <Title title="AncapHub - HUB de conteúdo Libertário" />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box textAlign="left" pr={5} pt={5}>
            <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold' }}>Bem vindo à versão de testes do AncapHub!</Typography>
            <ul className={classes.features}>
              <li className={classes.feature}><LibraryIcon className={classes.featureIcon} /><span>Tenha à sua disposição milhares de materiais para estudo.</span></li>
              <li className={classes.feature}><LocationSearchIcon className={classes.featureIcon} /><span>Conheça libertários que morem perto de você.</span></li>
              <li className={classes.feature}><GroupIcon className={classes.featureIcon} /><span>Crie e participe de grupos de estudo.</span></li>
              <li className={classes.feature}><EventIcon className={classes.featureIcon} /><span>Confira eventos libertários que irão rolar.</span></li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={3}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="textSecondary"
              variant="fullWidth">
              <Tab label="Cadastro" id="signup-tab" aria-controls="full-width-tabpanel-signup" />
              <Tab label="Entrar" id="signin-tab" aria-controls="full-width-tabpanel-signin" />
            </Tabs>
            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
              <Signup id="full-width-tabpanel-signup" aria-labelledby="signup-tab" />
              <Login id="full-width-tabpanel-signin" aria-labelledby="signin-tab" />
            </SwipeableViews>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home