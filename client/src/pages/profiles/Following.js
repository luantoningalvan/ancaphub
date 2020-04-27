import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getUserFollowingRequest } from '../../actions/users';
import UserCard from '../../components/users/UserCard';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import Paper from '../../components/ui/Paper';
import LoadContent from '../../components/ui/LoadContent';

const Feed = ({ user: userId }) => {
  const dispatch = useDispatch();
  const { loadingFollowing, following } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserFollowingRequest(userId));
  }, [dispatch, userId]);

  return (
    <LoadContent loading={loadingFollowing}>
      {following.length === 0 ? (
        <Paper padding>
          <FormattedMessage id="profile.following.notFollowingAnyone" />
        </Paper>
      ) : (
        <GridContainer spacing={1}>
          {following.map((user) => (
            <GridItem xs={4}>
              <UserCard user={user.user} />
            </GridItem>
          ))}
        </GridContainer>
      )}
    </LoadContent>
  );
};

export default memo(Feed);
