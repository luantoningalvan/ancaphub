import React, { useEffect } from 'react';
import PostNewStatus from '../../components/posts/postNewStatus';
import ShowPosts from '../../components/posts/showPosts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUserPosts } from '../../actions/postActions';
import LoadContent from '../../components/loaders/loadContent'

function UserFeed(props) {
  useEffect(() => props.loadUserPosts(props.user._id), [props.user._id]);

  return (
    <>
      {props.isUserLoggedProfile && <PostNewStatus user={props.user} />}
      
      <LoadContent loading={props.posts.loading}>
        <ShowPosts posts={props.posts.posts} />
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
