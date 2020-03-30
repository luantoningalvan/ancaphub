import React from "react";
import ThemeProvider from "./Provider";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Main from "./Main";

const Template = ({ children }) => {
  return (
    <ThemeProvider>
      <Header />
      <Sidenav />
      <Main>
        {children}
      </Main>
    </ThemeProvider>
  );
};

export default Template;