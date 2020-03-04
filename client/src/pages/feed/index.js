import React from "react";
import Container from "../../components/ui/Container";
import PostForm from "../../components/posts/PostForm";
import PostCard from "../../components/posts/PostCard";

export default props => (
  <Container>
    <div style={{ display: "grid", gridTemplateColumns: "auto 300px", gap: "1em", marginTop: "15px" }}>
      <div>
        <PostForm />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div>Sidebar</div>
    </div>
  </Container>
);
