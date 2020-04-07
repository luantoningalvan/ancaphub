import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import Container from '../../../components/ui/Container';
import Hero from '../../../components/ui/Hero';
import VideoCard from '../../../components/library/videos/VideoCard';

// Redux
import { getItemsRequest } from '../../../actions/library';

const Videos = ({ getItemsRequest: getItems }) => {
  React.useEffect(() => {
    getItems();
  }, [getItems]);

  const { items } = useSelector((state) => state.library);

  return (
    <Container>
      <Hero
        title="Vídeos"
        description="Descrição de Vídeos"
      />
      <div style={{
        display: 'grid', gap: '1em', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', marginTop: 25,
      }}
      >
        { items && items.length > 0 && items.map((item) => item.type === 'video' && <VideoCard video={item} />) }
      </div>

    </Container>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ getItemsRequest }, dispatch);
export default connect(null, mapDispatchToProps)(Videos);
