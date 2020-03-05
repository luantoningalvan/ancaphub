import React from "react";
import { ThemeProvider } from "styled-components";
import "./general.css";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Main from "./Main";

const theme = {
  pallete: {
    background: "#262d37",
    paper: "#1d2333",
    secondary: "#ecd003",
    text: {
      primary: "#fff",
      secondary: "#ccc"
    }
  }
};

const Template = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Sidenav />
      <Main>
        {children}
      </Main>
    </ThemeProvider>
  );
};

export default Template;
