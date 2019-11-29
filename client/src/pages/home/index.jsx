import React, { Fragment, useState } from 'react'
import { Box, Grid, Typography, Paper, Tabs, Tab } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import Login from '../../components/auth/login';
import Signup from '../../components/auth/signup';
import Template from '../../components/template'

const Home = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <Template>
    <Grid container>
      <Grid item xs={12} md={6}>
        <Box textAlign="center" my={3}>
        <Typography variant="h4" gutterBottom>Bem vindo à versão de testes do AncapHub</Typography>
        <Typography variant="body2">Faça um cadastro e aproveite!</Typography>
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
          <Tab label="Cadastro" />
          <Tab label="Entrar" />
        </Tabs>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <Signup />
          <Login />
        </SwipeableViews>
        </Box>
      </Grid>
    </Grid>
          </Template>
  )
}

export default Home