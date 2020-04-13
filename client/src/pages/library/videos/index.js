import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../../components/ui/Container';
import Hero from '../../../components/ui/Hero';
import Paper from '../../../components/ui/Paper';
import { getVideosRequest as getVideosAction } from '../../../actions/library';
import { isEmpty } from "lodash";
import ItemCard from "../../../components/library/LibraryCard";
import LoadContent from '../../../components/ui/LoadContent'

const Videos = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getVideosAction({ currentPage: 1 }));
  }, [dispatch]);

  const { videos, loading } = useSelector((state) => state.library);

  return (
    <Container>
      <Hero
        title="Vídeos"
        description="Descrição de Vídeos"
      />
      <div style={{ marginTop: 16 }}>
        <LoadContent loading={loading}>
          {videos && !isEmpty(videos) ? (
            <div
              style={{
                display: "grid",
                gap: "1em",
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
            >
              {videos.map((book) => (
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

export default Videos;
