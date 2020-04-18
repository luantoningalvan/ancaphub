import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const MenuItem = styled.li`
  svg {
    fill: ${props => props.theme.palette.text.primary};
    height:28px;
    width:28px;
    margin-right: 8px;
  }

  a {
    display:flex;
    align-items:center;
    padding: 16px;
    background: ${props => props.current ? 'rgba(0,0,0,0.1)' : 'transparent'};
    transition: background 0.3s;
    cursor:pointer;
    color: ${props => props.theme.palette.text.primary};
    
    &:hover {
      background: rgba(0,0,0,0.1);
    }
  }
`

export default ({link, label, icon, current, ...rest}) => (
  <MenuItem current={current} {...rest}>
    <Link to={link}>
      {icon}
      <span>{label}</span>
    </Link>
  </MenuItem>
)