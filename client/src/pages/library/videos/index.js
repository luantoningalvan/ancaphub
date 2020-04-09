import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../../components/ui/Container';
import Hero from '../../../components/ui/Hero';
import VideoCard from '../../../components/library/videos/VideoCard';

// Redux
import { getVideosRequest as getVideosAction } from '../../../actions/library';

const Videos = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getVideosAction({ currentPage: 1 }));
  }, [dispatch]);

  const { videos } = useSelector((state) => state.library);

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
        { videos && videos.length > 0 && videos.map((item) => <VideoCard video={item} />) }
      </div>

    </Container>
  );
};

export default Videos;
