import React from 'react';
import Paper from '../ui/Paper';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultGroupCover from '../../assets/default-group-cover.png';

const GroupCover = styled.div`
  width: 100%;
  height: 170px;
  background: url("${props => props.cover}");
  background-size: cover;
  background-position: center;
`;

const GroupInfo = styled.div`
  padding: 20px;
  h4 { margin-bottom: 5px; }
  a { 
    text-decoration: none; 
    color: ${props => props.theme.palette.text.primary};
  }
  span { 
    text-decoration: none; 
    color: ${props => props.theme.palette.text.secondary}; 
    display: block;
    margin-bottom: 15px;
  }
`;

const GroupCard = (props) => {
  const { _id, name, cover, membersCounts, hasEnrolled } = props.data
  return (
    <div style={{width:'100%'}}>
    <Paper>
      <Link to={`/groups/${_id}`}>
        <GroupCover cover={cover || defaultGroupCover} />
      </Link>
      <GroupInfo>
        <h4><Link to="/groups/id">{name}</Link></h4>
        <span>{membersCounts} membros</span>
        <Button fullwidth variant="outlined" color="primary">
          {hasEnrolled ? "Sair" : "Entrar"}
        </Button>
      </GroupInfo>
    </Paper>
    </div>
  )
};

export default GroupCard;