import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ThemeProvider from './Provider';
import Header from './Header';
import Sidenav from './Sidenav';
import Main from './Main';

const Template = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapse = () => {
    console.log('cu');
    setCollapsed(!collapsed);
  };
  return (
    <ThemeProvider>
      <Header user={auth.user} collapsed={collapsed} setCollapsed={handleCollapse} />
      <Sidenav user={auth.user} collapsed={collapsed} setCollapsed={handleCollapse} />
      <Main>{children}</Main>
    </ThemeProvider>
  );
};

export default Template;
