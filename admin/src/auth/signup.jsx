import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Form } from 'formik'
import { register } from './authActions'
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  useEffect(() => {
    // Caso o usuário estiver logado, redireciona para o painel de controle
    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }
  });

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>

        <Formik
          initialValues={{ name: '', email: '', password: '', password2: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            props.register(values, props.history)
          }}
          render={props => {
            const { values, touched, errors, handleChange, handleBlur } = props;
            
            return (
              <Form className={classes.form}>
                {(props.errors) ? (<p>{props.errors.message}</p>) : (<p>Nada</p>)}

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Nome Completo"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.name && touched.name) && errors.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Endereço de e-mail"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.email && touched.email) && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>

                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Senha"
                      type="password"
                      autoComplete="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.password && touched.password) && errors.password}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password2"
                      label="Confirmar Senha"
                      type="password"
                      value={values.password2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.password2 && touched.password2) && errors.password2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="Eu quero receber notificações em meu e-mail."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Cadastro
              </Button>
              </Form>)
          }}
        />
        <Grid container justify="flex-end">
          <Grid item>
            <Link component={RouterLink} to='/login' underline='none' color="textPrimary">
              Já tem uma conta? Fazer Login
                </Link>
          </Grid>
        </Grid>

      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ register }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
