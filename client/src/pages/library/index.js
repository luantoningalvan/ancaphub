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
            id="common.library"
            description="Título da página da biblioteca"
          />
        }
        description={
          <FormattedMessage
            id="home.features.0"
            description="Descrição da página da biblioteca"
          />
        }
      />
    </Container>
  );
};