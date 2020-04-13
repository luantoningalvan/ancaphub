import React from "react";
import ThemeProvider from "./Provider";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Main from "./Main";
import { useSelector } from 'react-redux'
const Template = ({ children }) => {
  const auth = useSelector(state => state.auth)
  console.log(auth)
  return (
    <ThemeProvider>
      <Header />
      <Sidenav user={auth.user} />
      <Main>{children}</Main>
    </ThemeProvider>
  );
};

export default Template;
