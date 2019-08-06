import React from 'react'
import Container from '@material-ui/core/Container'
import Template from '../template/template'
import Hero from '../template/hero'
import Box from '@material-ui/core/Box';

export default function Settings() {
  return (
    <Template>
      <Hero title="Configurações" />

      <Box mt={3}>
        <Container>
          Página em Construção.
        </Container>
      </Box>
    </Template>
  )
}
