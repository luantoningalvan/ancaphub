import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../../components/ui/Container';
import Hero from '../../../components/ui/Hero';
import ArticleCard from '../../../components/library/articles/ArticleCard';

// Redux
import { getArticlesRequest as getArticlesAction } from '../../../actions/library';

const Articles = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getArticlesAction({ currentPage: 1 }));
  }, [dispatch]);

  const { articles } = useSelector((state) => state.library);
  return (
    <Container>
      <Hero
        title="Artigos"
        description="Descrição de Artigos"
      />
      <div style={{
        display: 'grid', gap: '1em', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', marginTop: 25,
      }}
      >
        { articles && articles.length > 0 && articles.map((item) => <ArticleCard article={item} />) }
      </div>

    </Container>
  );
};

export default Articles;
