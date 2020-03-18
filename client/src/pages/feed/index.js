import React from "react";
import PostForm from "../../components/posts/PostForm";
import Container from "../../components/ui/Container";
import GridItem from "../../components/ui/GridItem";
import GridContainer from "../../components/ui/GridContainer";
import PostCard from "../../components/posts/PostCard";
import LastItemsWidget from "../../components/library/LastItemsWidget";
export default props => (
  <Container>
    <GridContainer spacing={1}>
      <GridItem xs={12} lg={8}>
        <PostForm />
        <PostCard />
        <PostCard />
        <PostCard />
      </GridItem>
      <GridItem xs={12} lg={4} xl={3}>
        <LastItemsWidget />
      </GridItem>
    </GridContainer>
  </Container>
);
