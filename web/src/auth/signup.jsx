import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp } from './authActions';

const useStyles = makeStyles(theme => ({
  tab: {
    width: '100%',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  button: {
    marginTop: '10px'
  },
  errorMessage: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  }
}));

function SignUpForm(props) {
  const classes = useStyles();
  // Validação frontend do formulário
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Nome muito curto!')
      .max(50, 'Nome muito longo!')
      .required('O campo nome é obrigatório!'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('O campo e-mail é obrigatório!'),
    password: Yup.string()
      .required('O campo senha é obrigatório!')
      .min(6, 'Sua senha precisa ter no mínimo 6 caracteres.'),
    password2: Yup.string()
      .required('O campo confirmar senha é obrigatório!')
      .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
  });

  return (
    <React.Fragment>
      {props.serverErrors.alerts != null &&
        props.serverErrors.alerts.msg.map((msg, index) => (
          <Box mb={1} key={index}>
            <p className={classes.errorMessage}>{msg.msg}</p>
          </Box>
        ))}

      <Formik
        initialValues={{ name: '', email: '', password: '', password2: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          props.signUp(values);
        }}
        render={props => {
          const { values, touched, errors, handleChange, handleBlur } = props;

          return (
            <Form className={classes.tab}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome Completo"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.name && touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    variant="outlined"
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Endereço de e-mail"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password2"
                    label="Confirmar Senha"
                    type="password"
                    id="password2"
                    autoComplete="password2"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.password2 && touched.password2 && errors.password2
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Eu quero receber notificações em meu e-mail."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}>
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({ serverErrors: state.alerts });
const mapDispatchToProps = dispatch => bindActionCreators({ signUp }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
