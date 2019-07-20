import React from 'react'
import PostNewStatus from '../../components/posts/postNewStatus'
import ShowPosts from '../../components/posts/showPosts'

function LoggedUserMenu(props) {
  return (
    <React.Fragment>
      {props.isUserLoggedProfile && <PostNewStatus user={props.user} />}
      <ShowPosts user={props.user} />
    </React.Fragment>
  );
}

export default LoggedUserMenu
