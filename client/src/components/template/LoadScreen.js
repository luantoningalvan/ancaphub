import React from 'react';
import styled from 'styled-components';
import ThemeProvider from './Provider';
import logo from '../../assets/logo-type.png';
import Loader from '../ui/Loader';

const LoadScreen = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;

  img {
    width: 150px;
  }

  span { margin-top: 16px; }
`;

export default () => (
  <ThemeProvider>
    <LoadScreen>
      <img src={logo} alt="AncapHub Logo" />
      <Loader size={96} />
    </LoadScreen>
  </ThemeProvider>
);
