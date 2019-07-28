import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
//import Header from './header'
//import Menu from './menu'
import Sidebar from './sidebar'
import Main from './main'

/* CSS FILES */
import '../assets/css/common.css'
import CssBaseline from '@material-ui/core/CssBaseline';

/* JS FILES */
import '../assets/js/script.js'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#131313',
    },
    secondary: {
      main: '#f5ee03',
    },
  },
});

export default function Template(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Sidebar />
      {/*
      <Header openDrawer={handleDrawerOpen} />
      <Menu open={open} />
      */}
      <Main open={open}>
        {props.children}
      </Main>
    </ThemeProvider>
  )
}