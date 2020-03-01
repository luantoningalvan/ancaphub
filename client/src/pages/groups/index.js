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
            id="common.groups"
            description="Título da página de grupos"
          />
        }
        description={
          <FormattedMessage
            id="home.features.1"
            description="Descrição da página de grupos"
          />
        }
      />
    </Container>
  );
};
