import React from "react";
import styled from 'styled-components'

const MainWrapper = styled.main`
  grid-area: main;
  color:white;
  padding:20px
`

const Main = ({children}) => {
  return (
    <MainWrapper>
        {children}
    </MainWrapper>
  )
};

export default Main;
