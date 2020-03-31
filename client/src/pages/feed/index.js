import React from 'react';
import PostForm from '../../components/posts/PostForm';
import Container from '../../components/ui/Container';
import GridItem from '../../components/ui/GridItem';
import GridContainer from '../../components/ui/GridContainer';
import PostCard from '../../components/posts/PostCard';
import LastItemsWidget from '../../components/library/LastItemsWidget';
import UserListWidget from '../../components/users/UserListWidget';
import TrendingTopicsWidget from '../../components/trends/TrendingTopicsWidget';

export default () => (
  <Container style={{ marginTop: 8 }}>
    <GridContainer spacing={1}>
      <GridItem xs={12} lg={8}>
        <PostForm />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </GridItem>
      <GridItem xs={12} lg={4} xl={3}>
        <TrendingTopicsWidget />
        <div style={{ marginTop: 16, width: '100%' }}>
          <LastItemsWidget />
        </div>
        <div style={{ marginTop: 16, width: '100%' }}>
          <UserListWidget />
        </div>
      </GridItem>
    </GridContainer>
  </Container>
);
