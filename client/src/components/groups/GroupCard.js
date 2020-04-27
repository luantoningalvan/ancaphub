import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paper from '../ui/Paper';
import Button from '../ui/Button';
import defaultGroupCover from '../../assets/default-group-cover.png';

const GroupCover = styled.div`
  width: 100%;
  height: 170px;
  background: url("${(props) => props.cover}");
  background-size: cover;
  background-position: center;
`;

const GroupInfo = styled.div`
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

const GroupCard = ({ data }) => {
  const {
    _id, name, cover, membersCounts, hasEnrolled,
  } = data;
  return (
    <div style={{ width: '100%' }}>
      <Paper>
        <Link to={`/groups/${_id}`}>
          <GroupCover cover={cover || defaultGroupCover} />
        </Link>
        <GroupInfo>
          <h4><Link to="/groups/id">{name}</Link></h4>
          <span>
            <FormattedMessage id="groups.membersNumber" values={{ num: membersCounts }} />
          </span>
          <Button fullwidth variant="outlined" color="primary">
            {hasEnrolled
              ? <FormattedMessage id="common.semanticQuit" />
              : <FormattedMessage id="common.semanticEnter" />}
          </Button>
        </GroupInfo>
      </Paper>
    </div>
  );
};

GroupCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    cover: PropTypes.string,
    membersCounts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hasEnrolled: PropTypes.bool,
  }),
};

export default GroupCard;
