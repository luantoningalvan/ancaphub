import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import Container from '../../../components/ui/Container';
import Hero from '../../../components/ui/Hero';
import ArticleCard from '../../../components/library/articles/ArticleCard';

// Redux
import { getItemsRequest } from '../../../actions/library';

const Articles = ({ getItemsRequest: getItems }) => {
  React.useEffect(() => {
    getItems();
  }, [getItems]);

  const { items } = useSelector((state) => state.library);
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
        { items && items.length > 0 && items.map((item) => item.type === 'article' && <ArticleCard article={item} />) }
      </div>

    </Container>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ getItemsRequest }, dispatch);
export default connect(null, mapDispatchToProps)(Articles);
