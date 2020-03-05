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
            id="common.events"
            description="Título da página de eventos"
          />
        }
        description={
          <FormattedMessage
            id="home.features.2"
            description="Descrição da página de eventos"
          />
        }
      />
    </Container>
  );
};