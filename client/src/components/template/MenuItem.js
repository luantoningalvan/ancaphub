import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  color: #fff;
  display: block;
  padding: 9.5px;
  margin: 10px;
  border-radius: 5px;
  text-align: center;
  background: ${props => props.current ? props.theme.pallete.secondary : "transparent"};
  
  > i svg {
    fill: ${props => props.current ? '#fff' : "#616a82"};
  }

  &:hover {
    background: #616a82;
    > i svg {
      fill: white;
    }
  }
`;

export const Item = styled.li`
  list-style:none;
  position: ${props => props.position };
  &:hover {
    ul { display: block; }
  }
`;

export default ({ link, icon, current }) => {
  return (
    <Item>
      <StyledLink to={link} current={current}>
        <i>{icon}</i>
      </StyledLink>
    </Item>
  );
};
