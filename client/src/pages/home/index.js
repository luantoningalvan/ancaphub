import React, { useState } from 'react';
import styled from 'styled-components';
import LibraryIcon from 'react-ionicons/lib/IosFolder';
import GroupIcon from 'react-ionicons/lib/IosPeople';
import EventIcon from 'react-ionicons/lib/IosCalendar';
import LocationSearchIcon from 'react-ionicons/lib/IosLocate';
import ThemeProvider from '../../components/template/Provider';
import Paper from '../../components/ui/Paper';
import Container from '../../components/ui/Container';
import SigninForm from '../../components/auth/SigninForm';
import SignupForm from '../../components/auth/SignupForm';
import logo from '../../assets/logo-type.png';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authUserRequest } from '../../actions/auth'
import { createUserRequest } from '../../actions/users'

const SignupBox = styled(Paper)`
  width: 100%;
  max-width: 400px;
  
  form {
    display: flex;
    flex-direction: column;
  }

  input { margin-bottom: 8px; }

  span {
    color: ${(props) => props.theme.palette.text.primary};
    text-align:center;
    display:block;
    margin-top:16px;
    cursor:pointer;

    &:hover {
      text-decoration:underline;
    }
  }
`;

const Features = styled.ul`
  color: ${(props) => props.theme.palette.text.primary};
  margin-top:8px;
  li { 
    list-style: none; 
    display:flex;
    align-items:center;
    font-size: 20px;
    margin-bottom: 8px;
    font-weight: lighter;
  }
  li > svg { 
    height:32px;
    width:32px;
    fill: ${(props) => props.theme.palette.text.primary}; 
    margin-right: 8px;
  }
`;

const Home = ({ authUserRequest:authUserAction, createUserRequest:createUserAction }) => {
  const [activeBox, setActiveBox] = useState('signup');

  return (
    <ThemeProvider>
      <Container style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100vh',
      }}
      >
        <div>
          <img src={logo} alt="Logo do AncapHub" />
          <h2 style={{ fontWeight: 'bold', marginTop: 24 }}>Bem vindo à versão de testes do AncapHub!</h2>
          <Features>
            <li>
              <LibraryIcon />
              <span>Tenha à sua disposição milhares de materiais para estudo.</span>
            </li>
            <li>
              <LocationSearchIcon />
              <span>Conheça libertários que morem perto de você.</span>
            </li>
            <li>
              <GroupIcon />
              <span>Crie e participe de grupos de estudo.</span>
            </li>
            <li>
              <EventIcon />
              <span>Confira eventos libertários que irão rolar.</span>
            </li>
          </Features>
        </div>
        <SignupBox padding>
          {activeBox === 'signin' ? (
            <>
              <h3 style={{
                fontWeight: 'bold', marginBottom: 16, marginTop: 8, textAlign: 'center',
              }}
              >
                Entrar
              </h3>
              <SigninForm onSubmit={authUserAction} />
              <span
                onClick={() => setActiveBox('signup')}
                role="link"
                tabIndex={0}
                onKeyDown={() => {}}
              >
                Não possui uma conta?
              </span>
            </>
          ) : (
            <>
              <h3 style={{
                fontWeight: 'bold', marginBottom: 16, marginTop: 8, textAlign: 'center',
              }}
              >
                Cadastro
              </h3>
              <SignupForm onSubmit={createUserAction} />
              <span
                onClick={() => setActiveBox('signin')}
                role="link"
                tabIndex={0}
                onKeyDown={() => {}}
              >
                Já tem uma conta?
              </span>
            </>
          )}
        </SignupBox>
      </Container>
    </ThemeProvider>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({authUserRequest, createUserRequest}, dispatch)
export default connect(null, mapDispatchToProps)(Home);
