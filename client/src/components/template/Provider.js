import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';


const themes = {
  dark: {
    palette: {
      primary: '#1141ad',
      secondary: '#e0b30d',
      background: '#161b28',
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

  li { list-style: none; }
  a { text-decoration: none; }
`;

const Template = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default Template;
