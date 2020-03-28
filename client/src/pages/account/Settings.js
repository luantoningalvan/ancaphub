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
            id="common.settings"
            description="Título da página de configurações"
          />
        }
      />
    </Container>
  );
};