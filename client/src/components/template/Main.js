import React from "react";
import styled from 'styled-components'

const MainWrapper = styled.main`
  color:white;
  width: calc(100% - 64px);
  margin-left:64px;
`

const Main = ({children}) => {
  return (
    <MainWrapper>
        {children}
    </MainWrapper>
  )
};

export default Main;
