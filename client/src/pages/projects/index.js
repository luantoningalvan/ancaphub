import React from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../../components/ui/Container';
import Hero from '../../components/ui/Hero';
import Button from '../../components/ui/Button';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import ProjectCard from '../../components/projects/ProjectCard';

// i18n

const projects = [
  {
    name: 'Escorts Ancap',
    cover: '',
    peopleWatching: 9999,
    hasEnrolled: true,
    _id: 1,
  },
];

export default () => (
  <>
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
        actions={(<Button type="contained" color="secondary">Criar projeto</Button>)}
      />
      <h3 style={{ margin: '20px 0 10px' }}>Explorar projetos</h3>

      <GridContainer spacing={1}>
        {projects.map((project) => (
          <GridItem xs={12} md={6} lg={4}>
            <ProjectCard data={project} />
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  </>
);
