import React, { useEffect, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFollowersRequest } from '../../actions/users';
import UserCard from '../../components/users/UserCard';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import Paper from '../../components/ui/Paper';
import LoadContent from '../../components/ui/LoadContent';

const Feed = ({ user: userId }) => {
  const dispatch = useDispatch();
  const { loadingFollowers, followers } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserFollowersRequest(userId));
  }, [dispatch, userId]);

  return (
    <LoadContent loading={loadingFollowers}>
      {followers.length === 0 ? (
        <Paper padding>
          <FormattedMessage id="profile.followers.noFollowers" />
        </Paper>
      ) : (
        <GridContainer spacing={1}>
          {followers.map((user) => (
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
