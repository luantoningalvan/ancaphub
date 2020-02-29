import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = styled.li``;
const Icon = styled.i``;
const StyledLink = styled(Link)`
  color: #fff;
  display: block;
  padding: 10px;
  margin:10px;
  border-radius:5px;
  text-align:center;
  background: ${props => props.current ? props.theme.pallete.secondary : "transparent"};
  
  > i svg {
    fill: ${props => props.current ? '#fff' : "#616a82"};
  }

  &:hover {
    background: #616a82;
    > i svg {
    fill: white
    }
  }
`
export default ({ link, icon, current }) => {
  return (
    <Item>
      <StyledLink to={link} current={current}>
        <Icon>{icon}</Icon>
      </StyledLink>
    </Item>
  );
};
