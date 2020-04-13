import React, { useEffect } from "react";
import Container from "../../components/ui/Container";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchTermRequest as searchTerm } from "../../actions/search";
import UserCard from "../../components/users/UserCard";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import Card from "../../components/ui/Card";
import CardHeader from "../../components/ui/CardHeader";
import CardBody from "../../components/ui/CardBody";
import Menu from "../../components/ui/Menu";
import MenuItem from "../../components/ui/MenuItem";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  let term = useQuery().get("s");
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchTerm !== "") {
      dispatch(searchTerm(term));
    }
  }, [term, searchTerm]);

  return (
    <Container style={{ marginTop: 16 }}>
      {!loading ? (
        <GridContainer spacing={2}>
          <GridItem xs={3}>
            <Card style={{ width: "100%" }}>
              <CardHeader>
                <h3>Filtrar resultados</h3>
              </CardHeader>
              <Menu>
                <MenuItem label="Todos" />
                <MenuItem label="Biblioteca" />
                <MenuItem label="Usuários" />
              </Menu>
            </Card>
          </GridItem>
          <GridItem xs={9}>
            <div style={{ width: "100%" }}>
              <h3 style={{ marginBottom: 16 }}>
                Exibindo resultados para "{term}"
              </h3>
              {results.users && results.users.length > 0 && (
<>
                  <h3 style={{ marginBottom: 8 }}>Usuários</h3>
                  <div style={{ width: "100%" }}>
                    <GridContainer>
                      {results.users.map((user) => (
                        <GridItem xs={3}>
                          <UserCard user={user.user} />
                        </GridItem>
                      ))}
                    </GridContainer>
                  </div>
                  </>
              )}
            </div>
          </GridItem>
        </GridContainer>
      ) : (
        <p>Carregando</p>
      )}
    </Container>
  );
};
