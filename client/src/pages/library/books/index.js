import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../../components/ui/Container';
import Hero from '../../../components/ui/Hero';
import BookCard from '../../../components/library/books/BookCard';

// Redux
import { getBooksRequest as getBooksAction } from '../../../actions/library';


const Books = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBooksAction({ currentPage: 1 }));
  }, [dispatch]);

  const { books } = useSelector((state) => state.library);

  return (
    <Container>
      <Hero
        title="Livros"
        description="Descrição de livros"
      />
      <div style={{
        display: 'grid', gap: '1em', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', marginTop: 25,
      }}
      >
        { books && books.length > 0 && books.map((item) => <BookCard book={item} />) }
      </div>

    </Container>
  );
};

export default Books;
