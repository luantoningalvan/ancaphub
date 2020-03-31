import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Paper from '../../components/ui/Paper';
import Tab from '../../components/ui/Tab';
import Button from '../../components/ui/Button';

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

const GroupMenu = styled.div`
  width: 100%;
  background: rgba(255,255,255,0.02);
`;

const SingleGroup = () => (
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

    <GroupMenu>
      <Container>
        <ul style={{ display: 'flex' }}>
          <Tab>
            <Link to="/user" className="current">Quadro</Link>
          </Tab>
          <Tab>
            <Link to="/user">Chat</Link>
          </Tab>
          <Tab>
            <Link to="/user">Arquivos</Link>
          </Tab>
          <Tab>
            <Link to="/user">Membros</Link>
          </Tab>
        </ul>
      </Container>
    </GroupMenu>
  </>
);

export default SingleGroup;
