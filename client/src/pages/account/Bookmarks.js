import React from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../../components/ui/Container';
import Hero from '../../components/ui/Hero';

export default () => (
  <Container>
    <Hero
      title={(
        <FormattedMessage
          id="account.bookmarks.savedItemsHeading"
          description="Título da página de salvos"
        />
        )}
    />
  </Container>
);
