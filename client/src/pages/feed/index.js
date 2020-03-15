import React from "react";
import Container from "../../components/ui/Container";
import PostForm from "../../components/posts/PostForm";
import PostCard from "../../components/posts/PostCard";
import LastItemsWidget from "../../components/library/LastItemsWidget";
export default props => (
  <Container>
    <div style={{ display: "grid", gridTemplateColumns: "auto 300px", gap: "1em", marginTop: "15px" }}>
      <div>
        <PostForm />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div>
        <LastItemsWidget />
      </div>
    </div>
  </Container>
);
