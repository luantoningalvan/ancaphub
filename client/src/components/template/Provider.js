import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';


const themes = {
  dark: {
    palette: {
      primary: '#1141ad',
      secondary: '#e0b30d',
      background: '#161b28',
      alert: {
        info: "#0099cc",
        success: "#007e33",
        error: "#cc0000",
        warning: "#f80"
      },
      paper: '#21283b',
      paperDark: '#1d2333',
      border: '#2f3749',
      text: {
        primary: '#fff',
        secondary: '#ccc',
        contrast: '#fff',
      },
    },
  },
  light: {
    palette: {
      primary: '#1141ad',
      secondary: '#e0b30d',
      background: '#f5f5f5',
      alert: {
        info: "#33b5e5",
        success: "#00c851",
        error: "#f44",
        warning: "#fb3"
      },
      paper: '#fff',
      paperDark: '#fff',
      border: '#ececec',
      text: {
        primary: '#000',
        secondary: '#777',
        contrast: '#fff',
      },
    },
  },
};

const theme = themes.dark;

const GlobalStyle = createGlobalStyle`
  body {
    background: ${theme.palette.background};
    color: ${theme.palette.text.primary};
  }
`;

const Template = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default Template;
