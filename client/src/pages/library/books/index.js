import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../../components/ui/Container";
import Hero from "../../../components/ui/Hero";
import ItemCard from "../../../components/library/LibraryCard";
import Paper from "../../../components/ui/Paper";
import { isEmpty } from "lodash";
import { getBooksRequest as getBooksAction } from "../../../actions/library";
import LoadContent from '../../../components/ui/LoadContent'

const Books = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBooksAction({ currentPage: 1 }));
  }, [dispatch]);

  const { books, loading } = useSelector((state) => state.library);

  return (
    <Container>
      <Hero title="Livros" description="Baixe diversos livros disponíveis nos principais formatos" />
      <div style={{ marginTop: 16 }}>
        <LoadContent loading={loading}>
          {books && !isEmpty(books) ? (
            <div
              style={{
                display: "grid",
                gap: "1em",
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
            >
              {books.map((book) => (
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

export default Books;
