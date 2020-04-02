import React from 'react';
import Container from '../../../components/ui/Container';
import Hero from '../../../components/ui/Hero';
import ArticleCard from '../../../components/library/articles/ArticleCard';

export default () => (
  <Container>
    <Hero
      title="Artigos"
      description="Descrição de Artigos"
    />
    <div style={{
      display: 'grid', gap: '1em', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', marginTop: 25,
    }}
    >
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </div>

  </Container>
);
