import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
// import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import CardHeader from '../ui/CardHeader';
import CardBody from '../ui/CardBody';
import CardFooter from '../ui/CardFooter';

const TrendingList = styled.ul`
li {
  margin-bottom:15px;
  list-style:none;
  border-bottom:1px solid ${(props) => props.theme.palette.border};
  padding-bottom:15px;

  &:last-child { padding:0;margin:0;border:none}
}

h4{
  font-weight:bold;
  font-size:1.1em;
  color: ${(props) => props.theme.palette.text.primary};
}

span {
  color: ${(props) => props.theme.palette.text.secondary};
  font-size:0.9em;
  font-weight:lighter;
}
`;

const TrendingTopicsWidget = () => (
  <div style={{ width: '100%' }}>
    <Card>
      <CardHeader>
        <h3>
          <FormattedMessage
            id="common.trending"
          />
        </h3>
      </CardHeader>
      <CardBody>
        <TrendingList>
          <li>
            <h4>#Trending 1</h4>
            <span>100 posts</span>
          </li>
          <li>
            <h4>#Trending 2</h4>
            <span>100 posts</span>
          </li>
          <li>
            <h4>#Trending 3</h4>
            <span>100 posts</span>
          </li>
          <li>
            <h4>#Trending 4</h4>
            <span>100 posts</span>
          </li>
        </TrendingList>
      </CardBody>
      <CardFooter link="/" label={<FormattedMessage id="common.showMore" />} />
    </Card>
  </div>
);

export default TrendingTopicsWidget;
