import React from 'react';
import Container from '../../../components/ui/Container';
import Hero from '../../../components/ui/Hero';
import VideoCard from '../../../components/library/videos/VideoCard';

export default () => (
  <Container>
    <Hero
      title="Vídeos"
      description="Descrição de Vídeos"
    />
    <div style={{
      display: 'grid', gap: '1em', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', marginTop: 25,
    }}
    >
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
    </div>

  </Container>
);
