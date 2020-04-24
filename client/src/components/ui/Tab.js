import React from 'react'

import styled from 'styled-components';
import { Link } from 'react-router-dom'

const TabStyle = styled.li`
  list-style: none;
  border-bottom: ${props => props.current 
    ? `3px solid ${props.theme.palette.secondary}`
    : '3px solid transparent'
  };

  &:hover {
    border-bottom: 3px solid ${(props) => props.theme.palette.secondary};
  }

  > a {
    display: block;
    color: ${props => props.theme.palette.text.primary};
    text-decoration: none;
    padding:  0px 16px;
    height:100%;
    display:flex;
    align-items:center;

    svg {
      fill: ${props => props.theme.palette.text.primary}
    }
  }
`;

const Tab = ({label, link, current }) => {
  return (
    <TabStyle current={current}>
      <Link to={link}>{label}</Link>
    </TabStyle>
  )
}

export default Tab