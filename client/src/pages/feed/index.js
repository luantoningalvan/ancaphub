import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPostsRequest as getPostsAction } from '../../actions/posts';

// Components
import PostForm from '../../components/posts/PostForm';
import Container from '../../components/ui/Container';
import GridItem from '../../components/ui/GridItem';
import GridContainer from '../../components/ui/GridContainer';
// import PostCard from '../../components/posts/PostCard';
import LastItemsWidget from '../../components/library/LastItemsWidget';
// import UserListWidget from '../../components/users/UserListWidget';
// import TrendingTopicsWidget from '../../components/trends/TrendingTopicsWidget';
import ShowPosts from '../../components/posts/ShowPosts';

const Feed = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  const { items } = useSelector((state) => state.posts);

  return (
    <Container style={{ marginTop: 8 }}>
      <GridContainer spacing={1}>
        <GridItem xs={12} lg={8}>
          <PostForm />
          <ShowPosts posts={items} />
        </GridItem>
        <GridItem xs={12} lg={4} xl={3}>
          {/* <TrendingTopicsWidget /> */}
          <div>
            <LastItemsWidget />
          </div>
          {/* <div style={{ marginTop: 16, width: '100%' }}>
            <UserListWidget />
          </div> */}
        </GridItem>
      </GridContainer>
    </Container>
  );
};

export default Feed;
