import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowingRequest } from "../../actions/users";
import UserCard from "../../components/users/UserCard";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import Paper from "../../components/ui/Paper";
import LoadContent from "../../components/ui/LoadContent";

const Feed = ({ user: userId }) => {
  const dipatch = useDispatch();
  const { loadingFollowing, following } = useSelector((state) => state.profile);

  useEffect(() => {
    dipatch(getUserFollowingRequest(userId));
  }, []);

  return (
    <LoadContent loading={loadingFollowing}>
        {following.length === 0 ? (
          <Paper padding>Esse usuário não segue ninguém.</Paper>
        ) : (
          <GridContainer spacing={1}>
          {following.map(user => (
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
