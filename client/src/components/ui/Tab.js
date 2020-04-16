import React from 'react'

import styled from 'styled-components';
import { Link } from 'react-router-dom'

const TabStyle = styled.li`
  list-style: none;
  border-bottom: ${props => props.current 
    ? `3px solid ${(props) => props.theme.palette.border}`
    : '3px solid transparent;'
  };

  &:hover {
    border-bottom: 3px solid ${(props) => props.theme.palette.border};
  }

  > a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 16px;
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