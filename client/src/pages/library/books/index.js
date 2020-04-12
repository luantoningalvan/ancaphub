import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../../components/ui/Container";
import Hero from "../../../components/ui/Hero";
import ItemCard from "../../../components/library/LibraryCard";
import Paper from "../../../components/ui/Paper";
import { isEmpty } from "lodash";
import { getBooksRequest as getBooksAction } from "../../../actions/library";

const Books = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBooksAction({ currentPage: 1 }));
  }, [dispatch]);

  const { books } = useSelector((state) => state.library);

  return (
    <Container>
      <Hero title="Livros" description="Baixe diversos livros disponíveis nos principais formatos" />
      {books && !isEmpty(books) ? (
        <div
          style={{
            display: "grid",
            gap: "1em",
            gridTemplateColumns: "repeat(5, 1fr)",
            marginTop: 16,
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
    </Container>
  );
};

export default Books;
