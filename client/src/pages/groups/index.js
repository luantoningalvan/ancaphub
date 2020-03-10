import React from "react";
import Container from "../../components/ui/Container";
import Hero from "../../components/ui/Hero";
import Button from "../../components/ui/Button";
import GroupCard from '../../components/groups/GroupCard'

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
        actions={
          <Button disableElevation variant="outlined">
            Criar Grupo
          </Button>
        }
      />
      <h3 style={{margin: '20px 0px 10px'}}>Explorar Grupos</h3>

      <div style={{display:'grid', gridTemplateColumns: "1fr 1fr 1fr", gap: '1em'}}>
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </div>
    </Container>
  );
};