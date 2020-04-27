import React, { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
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

const SignupBox = styled(Paper)`
  width: 100%;
  max-width: 400px;
  
  form {
    display: flex;
    flex-direction: column;
  }

  .switch-form {
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

export default () => {
  const [activeBox, setActiveBox] = useState('signup');

  return (
    <ThemeProvider>
      <Container style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100vh',
      }}
      >
        <div>
          <img src={logo} alt="AncapHub logo" />
          <h2 style={{ fontWeight: 'bold', marginTop: 24 }}>
            <FormattedMessage id="home.welcomeHeading" />
          </h2>
          <Features>
            <li>
              <LibraryIcon />
              <span>
                <FormattedMessage id="home.features.0" description="Study materials" />
              </span>
            </li>
            <li>
              <LocationSearchIcon />
              <span>
                <FormattedMessage id="home.features.2" description="Nearby people" />
              </span>
            </li>
            <li>
              <GroupIcon />
              <span>
                <FormattedMessage id="home.features.1" description="Groups" />
              </span>
            </li>
            <li>
              <EventIcon />
              <span>
                <FormattedMessage id="home.features.3" description="Events" />
              </span>
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
                <FormattedMessage id="common.login" />
              </h3>
              <SigninForm />
              <span
                className="switch-form"
                onClick={() => setActiveBox('signup')}
                role="link"
                tabIndex={0}
                onKeyDown={() => {}}
              >
                <FormattedMessage id="home.form.noAccount" />
              </span>
            </>
          ) : (
            <>
              <h3 style={{
                fontWeight: 'bold', marginBottom: 16, marginTop: 8, textAlign: 'center',
              }}
              >
                <FormattedMessage id="home.form.signUp" />
              </h3>
              <SignupForm />
              <span
                className="switch-form"
                onClick={() => setActiveBox('signin')}
                role="link"
                tabIndex={0}
                onKeyDown={() => {}}
              >
                <FormattedMessage id="home.form.hasAccount" />
              </span>
            </>
          )}
        </SignupBox>
      </Container>
    </ThemeProvider>
  );
};
