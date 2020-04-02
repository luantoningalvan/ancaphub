import React from 'react';
import ThemeProvider from './Provider'
import styled from 'styled-components'
import logo from '../../assets/logo-type.png'

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
`

export default props => (
  <ThemeProvider>
    <LoadScreen>
      <img src={logo} />
      <span>Carregando...</span>
    </LoadScreen>
  </ThemeProvider>
)