import React, { useEffect, useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Sidebar from './sidebar';
import Main from './main';
import SnackMessage from '../alerts/snackMessage';
import CssBaseline from '@material-ui/core/CssBaseline';

const themes = {
  "light": {
    typography: {
      fontFamily: ['Montserrat']
    },
    palette: {
      primary: {
        main: '#131313',
        contrastText: '#333',
      },
      secondary: {
        main: '#fb0'
      },
      background: {
        default: "#fafafa"
      },
      text: {
        primary: "#333",
      }
    }
  },
  "dark": {
    typography: {
      fontFamily: ['Montserrat']
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

export default function Template(props) {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')

    if (localTheme) {
      setTheme(localTheme)
    }
  }, [])

  return (
    <ThemeProvider theme={createMuiTheme(themes[theme])}>
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
