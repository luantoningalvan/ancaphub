import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Paper from '../../components/ui/Paper';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import Loader from '../../components/ui/Loader';

const GroupBoard = lazy(() => import('./GroupBoard'));
const GroupChat = lazy(() => import('./GroupChat'));
const GroupFiles = lazy(() => import('./GroupFiles'));
const GroupMembers = lazy(() => import('./GroupMembers'));

const Tabs = styled.ul`
  display: flex;

  > li {
    list-style: none;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme.palette.border};
    }
  }

  > li.current {
    border-bottom: 3px solid ${(props) => props.theme.palette.secondary};
  }
  > li a {
    display: block;
    color: ${(props) => props.theme.palette.text.primary};
    text-decoration: none;
    padding: 16px 32px;
  }
`;

const GroupBanner = styled.div`
  height: 200px;
  background: url("${(props) => props.cover}") rgba(0,0,0,.5);
  background-size: cover;
  background-blend-mode: overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;

  h2 {
    color: ${(props) => props.theme.palette.text.contrast};
    font-size: 1.9em;
    margin-bottom: 5px;
  }

  span {
    color: ${(props) => props.theme.palette.text.contrast};
    font-size: 1.1em;
    font-weight: lighter;
  }
`;


const GroupAbout = styled.div`
  width: 100%;
  > p {
    margin: 10px 0px;
  }
  > ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  > ul li {
    list-style: none;
    margin: 10px 0px;
  }
  > ul li a {
    color: ${(props) => props.theme.palette.text.primary};
  }
  > ul li svg {
    float: left;
    fill: ${(props) => props.theme.palette.text.primary};
    margin-right: 10px;
  }
`;

const SingleGroup = () => {
  const [Page, setPage] = React.useState();
  const { id: groupId, page: groupPage } = useParams();

  const pages = {
    undefined: <GroupBoard />,
    chat: <GroupChat />,
    files: <GroupFiles />,
    members: <GroupMembers />,
  };

  React.useEffect(() => {
    setPage(pages[groupPage]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupPage]);

  return (
    <>
      <GroupBanner cover="https://www.outraestacao.com/wp-content/uploads/2019/04/significado_bandeira_rio_grande_do_sul.jpg">
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Anarco Bagualismo</h2>
              <span>Grupo Público - 120 membros</span>
            </div>
            <div>
              <Button color="secondary">SAIR</Button>
            </div>
          </div>
        </Container>
      </GroupBanner>
      <Container>
        <GridContainer style={{ marginTop: 16 }} spacing={2}>
          <GridItem xs={4}>
            <Paper padding style={{ width: '100%' }}>
              <GroupAbout>
                <h3>Sobre Anarco Bagualismo</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </GroupAbout>
            </Paper>
          </GridItem>
          <GridItem xs={8}>
            <Paper style={{ width: '100%' }}>
              <Tabs>
                <li className={groupPage === undefined ? 'current' : ''}>
                  <Link to={`/groups/${groupId}`}>Quadro</Link>
                </li>
                <li className={groupPage === 'chat' ? 'current' : ''}>
                  <Link to={`/groups/${groupId}/chat`}>Chat</Link>
                </li>
                <li className={groupPage === 'files' ? 'current' : ''}>
                  <Link to={`/groups/${groupId}/files`}>Arquivos</Link>
                </li>
                <li className={groupPage === 'members' ? 'current' : ''}>
                  <Link to={`/groups/${groupId}/members`}>Membros</Link>
                </li>
              </Tabs>
            </Paper>
            <div style={{
              width: '100%', margin: '16px 0',
            }}
            >
              <Suspense fallback={<Loader size={96} />}>
                {Page}
              </Suspense>
            </div>
          </GridItem>
        </GridContainer>
      </Container>
    </>
  );
};

export default SingleGroup;
