import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, connect } from 'react-redux';
import { getUserPostsRequest } from '../../actions/posts';
import PostForm from '../../components/posts/PostForm';
import PostCard from '../../components/posts/PostCard';

const Feed = ({ getUserPostsRequest: getUserPostsAction }) => {
  const stateObj = useSelector((state) => state);
  const { user } = stateObj.auth;

  React.useEffect(() => {
    getUserPostsAction({ userId: user._id });
  }, [getUserPostsAction, user._id]);

  return (
    <>
      <PostForm />
      {stateObj.profile.userFeedItems.map((item) => <PostCard data={{ ...item }} />)}
    </>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ getUserPostsRequest }, dispatch);
export default connect(null, mapDispatchToProps)(Feed);
