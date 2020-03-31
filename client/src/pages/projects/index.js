import React from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../../components/ui/Container';
import Hero from '../../components/ui/Hero';

// i18n

export default (props) => (
  <Container>
    <Hero
      title={(
        <FormattedMessage
          id="common.projects"
          description="Título da página de projetos"
        />
        )}
      description={(
        <FormattedMessage
          id="home.features.3"
          description="Descrição da página de projetos"
        />
        )}
    />
  </Container>
);
