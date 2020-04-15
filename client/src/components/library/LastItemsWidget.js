import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import CardFooter from '../ui/CardFooter';
import CardHeader from '../ui/CardHeader';
import CardBody from '../ui/CardBody';
import defaultCover from '../../assets/default-book-cover.jpg';

// Redux actions
import { getRecentItemsRequest } from '../../actions/library';

const LastItems = styled.div`
  padding:0;
  margin:0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Item = styled(Link)`
  display: flex;
  border-radius: 4px;
  background: ${(props) => props.theme.palette.paperDark};
  overflow: hidden;
  cursor: pointer;
  height: 95px;
  text-decoration:none;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.08);
  
  &:hover { 
    background-color: rgba(0,0,0,0.03); 
  }
  
  margin-bottom: 10px;

  &:last-child { margin-bottom: 0 }
`;

const ItemCover = styled.div`
  width: 70px;
  height: 95px;
  overflow: hidden;
  background-image: url(${(props) => props.cover});
  background-size: cover;
  background-position: center;
`;
const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1em;
  flex: 1;

  .title {
    font-weight: bold;
    font-size: 1.1em;
    max-height:2.2em;
    margin-bottom:5px;
    color: ${(props) => props.theme.palette.text.primary};
    overflow:hidden;
  }

  .author {
    font-weight: lighter;
    font-size: 14px;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

const LastItemsWidget = () => {
  const dispatch = useDispatch();
  const { recentItems: items } = useSelector((state) => state.library);

  React.useEffect(() => {
    dispatch(getRecentItemsRequest());
  }, [dispatch]);

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <CardHeader>
          <h3>
            <FormattedMessage
              id="common.lastItems"
            />
          </h3>
        </CardHeader>
        <CardBody>
          <LastItems>
            {items && items.map((item) => (
              <Item to={`/${item.type}s/${item._id}`} key={item._id}>
                <ItemCover cover={item.cover !== '' ? item.cover.url : defaultCover} />
                <ItemContent>
                  <h4 className="title">{item.title.substr(0, 49)}</h4>
                  <h5 className="author">{item.author.substr(0, 49)}</h5>
                </ItemContent>
              </Item>
            ))}
          </LastItems>
        </CardBody>
        <CardFooter link="/" label={<FormattedMessage id="common.showMore" />} />
      </Card>
    </div>
  );
};

export default LastItemsWidget;
