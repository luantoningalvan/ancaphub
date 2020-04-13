import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowersRequest } from "../../actions/users";
import UserCard from "../../components/users/UserCard";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import Paper from "../../components/ui/Paper";
import LoadContent from "../../components/ui/LoadContent";

const Feed = ({ user: userId }) => {
  const dipatch = useDispatch();
  const { loadingFollowers, followers } = useSelector((state) => state.profile);

  useEffect(() => {
    dipatch(getUserFollowersRequest(userId));
  }, []);

  return (
    <LoadContent loading={loadingFollowers}>
      {followers.length === 0 ? (
        <Paper padding>Esse usuário não é seguido por ninguém.</Paper>
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
