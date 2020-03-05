import React, { useEffect } from 'react';
import PostNewStatus from '../../components/posts/postNewStatus';
import ShowPosts from '../../components/posts/showPosts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUserPosts } from '../../actions/postActions';
import LoadContent from '../../components/loaders/loadContent'

function UserFeed({loadUserPosts, isUserLoggedProfile, posts, user}) {
  useEffect(() => loadUserPosts(user._id), [user._id, loadUserPosts]);

  return (
    <>
      {isUserLoggedProfile && <PostNewStatus user={user} />}
      
      <LoadContent loading={posts.loading}>
        <ShowPosts posts={posts.posts} />
      </LoadContent>
    </>
  );
}

const mapStateToProps = state => ({ posts: state.posts });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadUserPosts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFeed);
