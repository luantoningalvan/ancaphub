import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paper from '../ui/Paper';
import Button from '../ui/Button';
import defaultProjectCover from '../../assets/default-group-cover.png';

const ProjectCover = styled.div`
  width: 100%;
  height: 170px;
  background: url("${(props) => props.cover}");
  background-size: cover;
  background-position: center;
`;

const ProjectInfo = styled.div`
  padding: 20px;
  h4 { margin-bottom: 5px; }
  a { 
    text-decoration: none; 
    color: ${(props) => props.theme.palette.text.primary};
  }
  span { 
    text-decoration: none; 
    color: ${(props) => props.theme.palette.text.secondary}; 
    display: block;
    margin-bottom: 15px;
  }
`;

const ProjectCard = ({ data }) => {
  const {
    _id, name, cover, peopleWatching, hasEnrolled,
  } = data;
  return (
    <div style={{ width: '100%' }}>
      <Paper>
        <Link to={`/projects/${_id}`}>
          <ProjectCover cover={cover || defaultProjectCover} />
        </Link>
        <ProjectInfo>
          <h4><Link to="/projects/id">{name}</Link></h4>
          <span>
            {peopleWatching}
            {' '}
            pessoas acompanhando
          </span>
          <Button fullwidth variant="outlined" color="secondary">
            {hasEnrolled ? 'Deixar de acompanhar' : 'Acompanhar'}
          </Button>
        </ProjectInfo>
      </Paper>
    </div>
  );
};

ProjectCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    cover: PropTypes.string,
    peopleWatching: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hasEnrolled: PropTypes.bool,
  }),
};

export default ProjectCard;
