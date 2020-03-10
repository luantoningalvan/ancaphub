import React from 'react';
import Paper from '../ui/Paper'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const GroupCover = styled.div`
  width: 100%;
  height:170px;
  background: url('${props => props.cover}');
  background-size:cover;
  background-position:center
`

const GroupInfo = styled.div`
  padding:20px;
  h4 { margin-bottom:5px;}
  a { 
    text-decoration:none; 
    color: ${props => props.theme.pallete.text.primary};
  }
  span { 
    text-decoration:none; 
    color: ${props => props.theme.pallete.text.secondary}; 
    display:block;
    margin-bottom:15px;
  }
`

const GroupCard = () => {
  return (
    <Paper>
      <Link to="/groups/id">
      <GroupCover cover="https://www.outraestacao.com/wp-content/uploads/2019/04/significado_bandeira_rio_grande_do_sul.jpg" />
      </Link>
      <GroupInfo>
        <h4><Link to="/groups/id">Anarco Bagualismo</Link></h4>
        <span>11 mil membros</span>
        <Button fullwidth variant="outlined" disableElevation>Entrar</Button>
      </GroupInfo>
    </Paper>
  )
}

export default GroupCard