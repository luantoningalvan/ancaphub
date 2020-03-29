import React from "react";
import _ from "lodash";
import styled from "styled-components";
import Container from "../../components/ui/Container";
import Paper from "../../components/ui/Paper";
import Hero from "../../components/ui/Hero";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";

// i18n
import { FormattedMessage } from "react-intl";

const StyledForm = styled.form`
  padding: 1em;
  margin: 8px 0;
  & > h3, & > input {
    margin: 1em 0;
  }
`;

const PasswordStrength = styled.progress`
  -webkit-appearance: none;
  appearance: none;
  
  &[value]::-webkit-progress-bar {
    background-color: transparent;
  }

  &[value]::-webkit-progress-value {
    height: 1em;
    border-radius: 5px;
    transition: all 300ms ease-in-out;
    background-image:
	   -webkit-linear-gradient(-30deg, transparent 33%, rgba(0, 0, 0, .05) 33%, rgba(0, 0, 0, .05) 66%, transparent 66%),
	   -webkit-linear-gradient(top, rgba(255, 255, 255, .10), rgba(0, 0, 0, .10)),
	   -webkit-linear-gradient(left, ${props => props.theme.palette.primary}, ${props => props.theme.palette.secondary});
  }
`;

export default props => {
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const handleUsernameRegex = _.throttle(() => {
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!username.match(regex)) {
      return <FormattedMessage id="account.settings.validation.regex" />;
    } else return;
  }, 500);

  const handlePasswordRegex = _.throttle(() => {
    const weakRegex = /^(?=.*[a-z0-9A-Z]).{6,}$/;
    const mediumRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
    const strongRegex = /^(?=.*[\w])(?=.*[0-9\W])(?=.*[\W]).{6,}$/

    if (password.match(strongRegex)) return 3;
    if (password.match(mediumRegex)) return 2;
    if (password.match(weakRegex)) return 1;
  }, 500);

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
      <div style={{ marginTop: 15 }}>
      <Paper> 
       <StyledForm>
         <h3><FormattedMessage id="common.username" /></h3>
         <FormattedMessage id="account.settings.insertNewUsername">
           {msg => <TextField fullWidth placeholder={msg} onChange={e => setUsername(e.target.value)}/>}
         </FormattedMessage>
         {(username && username.length >= 3) && <small>{handleUsernameRegex()}</small>}
         <h3><FormattedMessage id="common.password" /></h3>
         <FormattedMessage id="account.settings.typeCurrentPassword">
           {msg => <TextField fullWidth type="password" placeholder={msg} />}
         </FormattedMessage>
         <FormattedMessage id="account.settings.insertNewPassword">
           {msg => <TextField fullWidth type="password" placeholder={msg} onChange={e => setPassword(e.target.value)} />}
         </FormattedMessage>
         {(password && password.length >= 6) && <div><small>Password strength:</small> <PasswordStrength max="3" value={handlePasswordRegex()} /></div>}
         <h3><FormattedMessage id="common.email" /></h3>
         <FormattedMessage id="account.settings.insertNewEmail">
           {msg => <TextField fullWidth placeholder={msg} />}
         </FormattedMessage>
         <div style={{ display: "flex", justifyContent: "flex-end", padding: 8 }}>
          <Button type="submit" variant="filled" color="secondary">
            <FormattedMessage id="common.save" />
          </Button>
         </div>
       </StyledForm>
      </Paper>
      </div>
    </Container>
  );
};