import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import { getPostsRequest } from '../../actions/posts';

// Components
import PostForm from '../../components/posts/PostForm';
import Container from '../../components/ui/Container';
import GridItem from '../../components/ui/GridItem';
import GridContainer from '../../components/ui/GridContainer';
import PostCard from '../../components/posts/PostCard';
import LastItemsWidget from '../../components/library/LastItemsWidget';
import UserListWidget from '../../components/users/UserListWidget';
import TrendingTopicsWidget from '../../components/trends/TrendingTopicsWidget';


const Feed = ({ getPostsRequest: getPostsAction }) => {
  React.useEffect(() => {
    getPostsAction();
  }, [getPostsAction]);

  const { items } = useSelector((state) => state.posts);

  return (
    <Container style={{ marginTop: 8 }}>
      <GridContainer spacing={1}>
        <GridItem xs={12} lg={8}>
          <PostForm />
          {items.map((item) => (
            <PostCard data={{ ...item }} />
          ))}
        </GridItem>
        <GridItem xs={12} lg={4} xl={3}>
          {/*<TrendingTopicsWidget />*/}
          <div>
            <LastItemsWidget />
          </div>
          {/*<div style={{ marginTop: 16, width: '100%' }}>
            <UserListWidget />
          </div>*/}
        </GridItem>
      </GridContainer>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ getPostsRequest }, dispatch);
export default connect(null, mapDispatchToProps)(Feed);
