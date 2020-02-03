import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons'
import * as Yup from 'yup';
import Title from '../../components/template/titleComponent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateUsername, updateEmail, updatePassword } from '../../actions/accountActions';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: '#bbb',
  },
}));

// A implementar
const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Nome de usuário muito curto!')
    .max(20, 'Nome de usuário muito longo!')
    .matches(/^[a-zA-Z0-9_]+$/, "É permitido apenas letras, números e _ ")
    .required('O campo NOME DE USUÁRIO é obrigatório!'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('O campo E-MAIL é obrigatório!'),
  currentPassword: Yup.string()
    .required("O campo SENHA ATUAL é obrigatório"),
  newPassword: Yup.string()
    .required('O campo SENHA é obrigatório!')
    .min(6, 'Sua senha precisa ter no mínimo 6 caracteres.'),
  confirmNewPassword: Yup.string()
    .required('O campo CONFIRMAR SENHA é obrigatório!')
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
});

const Settings = ({ auth, updateUsername, updateEmail, updatePassword }) => {
  const classes = useStyles()

  const [data, setData] = useState({
    username: auth.user.username,
    email: auth.user.email,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const [panelState, setPanelState] = useState({
    username: false,
    email: false,
    password: false
  })

  const handlePanel = panel => (event) => {
    setPanelState(data => ({ ...data, [panel]: !data[panel] }));
  };

  const handleChange = prop => event => {
    setData({ ...data, [prop]: event.target.value });
  };

  return (
    <>
      <Title title="Configurações" />

      <Box mb={3}>
        <Typography variant="h4" component="h2">
          Configurações
        </Typography>
      </Box>

      <ExpansionPanel expanded={panelState.username} onChange={handlePanel('username')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Nome de Usuário</Typography>
          <Typography className={classes.secondaryHeading}>@{auth.user.username}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ width: "100%" }}>
            <Box>
              <TextField
                label="Nome de Usuário"
                value={data.username}
                onChange={handleChange("username")}
                placeholder="Insira seu novo nome de usuário"
                color="secondary"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mt={2}>
              <Button
                color="secondary"
                variant="contained"
                disabled={auth.loading || data.username === auth.user.username}
                startIcon={auth.loading ? <CircularProgress color="secondary" size={20} /> : <EditIcon />}
                disableElevation
                onClick={() => updateUsername(data.username)}
              >
                {auth.loading ? "Salvando" : "Salvar"}
              </Button>
            </Box>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={panelState.email} onChange={handlePanel('email')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>E-mail</Typography>
          <Typography className={classes.secondaryHeading}>
            {auth.user.email}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ width: "100%" }}>
            <Box>
              <TextField
                label="E-mail"
                value={data.email}
                onChange={handleChange("email")}
                type="email"
                placeholder="Insira seu novo e-mail"
                color="secondary"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mt={2}>
              <Button
                color="secondary"
                variant="contained"
                disabled={auth.loading || data.email === auth.user.email}
                startIcon={auth.loading ? <CircularProgress color="secondary" size={20} /> : <EditIcon />}
                disableElevation
                onClick={() => updateEmail(data.email)}
              >
                {auth.loading ? "Salvando" : "Salvar"}
              </Button>
            </Box>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={panelState.password} onChange={handlePanel('password')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Senha</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ width: "100%" }}>
            <Box>
              <TextField
                label="Nova Senha"
                value={data.newPassword}
                onChange={handleChange("newPassword")}
                type="password"
                placeholder="Insira sua nova senha"
                color="secondary"
                margin='normal'
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                label="Confirmar nova senha"
                value={data.confirmNewPassword}
                onChange={handleChange("confirmNewPassword")}
                type="password"
                placeholder="Confirme sua nova senha"
                color="secondary"
                margin='normal'
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                label="E-mail"
                value={data.currentPassword}
                onChange={handleChange("currentPassword")}
                type="password"
                placeholder="Digite sua senha atual"
                color="secondary"
                margin='normal'
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mt={2}>
              <Button
                color="secondary"
                onClick={() => updatePassword(data.currentPassword, data.newPassword)}
                variant="contained"
                disabled={auth.loading}
                startIcon={auth.loading ? <CircularProgress color="secondary" size={20} /> : <EditIcon />}
                disableElevation
              >
                {auth.loading ? "Salvando" : "Salvar"}
              </Button>
            </Box>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUsername, updateEmail, updatePassword
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
