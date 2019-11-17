import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Template from '../../template/template';
import Hero from '../../template/hero';
import TitleComponent from '../../components/titleComponent';

export default function Settings() {
  return (
    <Template>
      <TitleComponent title="Configurações" />
      <Hero title="Configurações" />

      <Box mt={3}>
        <Container>Página em Construção.</Container>
      </Box>
    </Template>
  );
}
