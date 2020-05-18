import React from 'react';
import ListCard from '../../components/lists/ListCard';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';

const Lists = () => {
  const lists = [
    {
      title: 'Pretendo ler',
      itemsCount: 3,
      cover: 'https://images-na.ssl-images-amazon.com/images/I/9140LT91hYL.jpg',
    },
    {
      title: 'Lidos',
      itemsCount: 12,
      cover: 'https://cdn.mises.org.br/images/articles/b6f1001c42844f29b2832c713c13c5bc.jpg',
    },
    {
      title: 'Iniciantes',
      itemsCount: 8,
      cover: 'https://images-na.ssl-images-amazon.com/images/I/71cA1CzENgL.jpg',
    },
  ];

  return (
    <GridContainer spacing={2}>
      {lists.map((list) => (
        <GridItem sm={6} lg={4}>
          <ListCard list={list} />
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default Lists;
