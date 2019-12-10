import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Sidebar from './sidebar';
import Main from './main';
import TopBar from './topBar';
import SnackMessage from '../alerts/snackMessage';
import CssBaseline from '@material-ui/core/CssBaseline';

const themes = {
  "light": {
    typography: {
      fontFamily: ['Ubuntu']
    },
    palette: {
      primary: {
        main: '#fff',
        contrastText: '#000',
      },
      secondary: {
        main: '#fb0'
      },
      background: {
        default: "#f4f4f4"
      },
      text: {
        primary: "#000",
      },
    }
  },
  "dark": {
    typography: {
      fontFamily: ['Ubuntu']
    },
    palette: {
      primary: {
        main: '#131313',
        contrastText: '#fff',
      },
      secondary: {
        main: '#fb0',
      },
      background: {
        paper: "#131313",
        default: "#1a1a1a"
      },
      text: {
        primary: "#fff",
        secondary: "#aaa",
        hint: "#0f0"
      }
    }
  }
};

function Template(props) {
  return (
    <ThemeProvider theme={createMuiTheme(themes[props.template.darkMode ? "dark" : "light"])}>
      <CssBaseline />
      <SnackMessage />
        {props.auth.isAuthenticated ? <Sidebar /> : <TopBar /> }
        
        <Main open={props.auth.isAuthenticated} {...props}>
          {props.children}
        </Main>
    </ThemeProvider>
  );
}
const mapStateToProps = state => ({ template: state.template, auth: state.auth })
export default connect(mapStateToProps)(Template)