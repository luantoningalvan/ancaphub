import React from "react";
import Container from "../../components/ui/Container";
import Hero from "../../components/ui/Hero";
import Button from "../../components/ui/Button";
import GroupCard from '../../components/groups/GroupCard';
import GridItem from "../../components/ui/GridItem";
import GridContainer from "../../components/ui/GridContainer";

// i18n
import { FormattedMessage } from "react-intl";

const groups = [
  {
    name: 'Grupo 1',
    cover: '',
    membersCounts: 200,
    hasEnrolled: false,
    _id: "1"
  },
  {
    name: 'Grupo 2',
    cover: '',
    membersCounts: 300,
    hasEnrolled: false,
    _id: "2"
  },
  {
    name: 'Grupo 3',
    cover: '',
    membersCounts: 400,
    hasEnrolled: false,
    _id: "3"
  },
  {
    name: 'Grupo 4',
    cover: '',
    membersCounts: 500,
    hasEnrolled: false,
    _id: "4"
  },
]

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
      <h3 style={{margin: "20px 0px 10px"}}>Explorar Grupos</h3>

      <GridContainer spacing={1}>
        {groups.map(group => (
          <GridItem xs={12} md={6} lg={4}>
            <GroupCard data={group} />
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  );
};