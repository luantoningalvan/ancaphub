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
          id="account.bookmarks.savedItemsHeading"
          description="Título da página de salvos"
        />
        )}
    />
  </Container>
);
