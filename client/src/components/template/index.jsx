import React, { useEffect, useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles';
import Sidebar from './sidebar';
import Main from './main';
import SnackMessage from '../alerts/snackMessage';
import CssBaseline from '@material-ui/core/CssBaseline';

const themes = {
  "light": {
    shadows: ["none"],
    typography: {
      fontFamily: ['Ubuntu']
    },
    palette: {
      primary: {
        main: '#fff',
        contrastText: '#333',
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
      <div style={{ display: 'flex', height: "100%" }}>
        <Sidebar />
        <Main open={true} {...props}>
          {props.children}
        </Main>
      </div>
    </ThemeProvider>
  );
}
const mapStateToProps = state => ({ template: state.template })
export default connect(mapStateToProps)(Template)