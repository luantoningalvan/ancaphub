import React from 'react';
import { useSelector } from 'react-redux';
import ThemeProvider from './Provider';
import Header from './Header';
import Sidenav from './Sidenav';
import Main from './Main';

const Template = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <ThemeProvider>
      <Header user={auth.user} />
      <Sidenav user={auth.user} />
      <Main>{children}</Main>
    </ThemeProvider>
  );
};

export default Template;
