import React from "react";
import Container from "../../components/ui/Container";
import Hero from "../../components/ui/Hero";

// i18n
import { FormattedMessage } from "react-intl";

export default props => {
  return (
    <Container>
      <Hero
        title={
          <FormattedMessage
            id="account.bookmarks.savedItemsHeading"
            description="Título da página de salvos"
          />
        }
      />
    </Container>
  );
};