import React from "react";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from 'styled-components'
import Header from "./Header";
import Sidenav from "./Sidenav";
import Main from "./Main";

const themes = {
  dark: {
    palette: {
      primary: "#1141ad",
      secondary: "#e0b30d",
      background: "#161b28",
      paper: "#21283b",
      paperDark: "#1d2333",
      border: "#2f3749",
      text: {
        primary: "#fff",
        secondary: "#ccc",
        contrast: "#fff"
      }
    }
  },
  light: {
    palette: {
      primary: "#1141ad",
      secondary: "#e0b30d",
      background: "#f5f5f5",
      paper: "#fff",
      paperDark: "#fff",
      border: "#ececec",
      text: {
        primary: "#000",
        secondary: "#777",
        contrast: "#fff"
      }
    }
  }
};

const theme = themes.dark

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline:none;
    box-sizing: border-box;
  }

  body {
    font-family: Ubuntu;
    background: ${theme.palette.background};
    color: ${theme.palette.text.primary};
  }
`

const Template = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Sidenav />
      <Main>
        {children}
      </Main>
    </ThemeProvider>
  );
};

export default Template;