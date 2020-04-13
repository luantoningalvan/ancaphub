import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../../components/ui/Container";
import Hero from "../../../components/ui/Hero";
import Paper from "../../../components/ui/Paper";
import { isEmpty } from "lodash";
import ItemCard from "../../../components/library/LibraryCard";
import { getArticlesRequest as getArticlesAction } from "../../../actions/library";
import LoadContent from "../../../components/ui/LoadContent";

const Articles = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getArticlesAction({ currentPage: 1 }));
  }, [dispatch]);

  const { articles, loading } = useSelector((state) => state.library);
  return (
    <Container>
      <Hero title="Artigos" description="Descrição de Artigos" />
      <div style={{ marginTop: 16 }}>
        <LoadContent loading={loading}>
          {articles && !isEmpty(articles) ? (
            <div
              style={{
                display: "grid",
                gap: "1em",
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
            >
              {articles.map((book) => (
                <ItemCard item={book} />
              ))}
            </div>
          ) : (
            <Paper padding>
              <p>Nenhum livro encontrado.</p>
            </Paper>
          )}
        </LoadContent>
      </div>
    </Container>
  );
};

export default Articles;
