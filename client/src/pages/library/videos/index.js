import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../../components/ui/Container';
import Hero from '../../../components/ui/Hero';
import Paper from '../../../components/ui/Paper';
import { getVideosRequest as getVideosAction } from '../../../actions/library';
import { isEmpty } from "lodash";
import ItemCard from "../../../components/library/LibraryCard";

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
      {videos && !isEmpty(videos) ? (
        <div
          style={{
            display: "grid",
            gap: "1em",
            gridTemplateColumns: "repeat(5, 1fr)",
            marginTop: 16,
          }}
        >
          {videos.map((video) => (
            <ItemCard item={video} />
          ))}
        </div>
      ) : (
        <Paper padding>
          <p>Nenhum vídeo encontrado.</p>
        </Paper>
      )}

    </Container>
  );
};

export default Videos;
