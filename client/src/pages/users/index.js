import React, { useEffect } from "react";
import Container from "../../components/ui/Container";
import Hero from "../../components/ui/Hero";
import Paper from "../../components/ui/Paper";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import { useDispatch, useSelector } from "react-redux";
import { getUsersRequest } from "../../actions/users";
import UserCard from "../../components/users/UserCard";
import LoadContent from "../../components/ui/LoadContent";
import { isEmpty } from "lodash";

export default () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  return (
    <Container>
      <Hero title="Usuários" />
      <div style={{ marginTop: 16 }}>
        <LoadContent loading={loading}>
          {!isEmpty(items) ? (
            <GridContainer spacing={2}>
              {items.map((user) => (
                <GridItem xs={3}>
                  <UserCard user={user.user} />
                </GridItem>
              ))}
            </GridContainer>
          ) : (
            <Paper padding>Nenhum usuário encontrado.</Paper>
          )}
        </LoadContent>
      </div>
    </Container>
  );
};
