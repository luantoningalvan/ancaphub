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
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import { login } from './authActions'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignIn(props) {
  const classes = useStyles();

  useEffect(() => {
    // Caso o usuário estiver logado, redireciona para o painel de controle
    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }
  });

  // Validação frontend do formulário
  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('O campo e-mail é obrigatório!'),
    password: Yup.string()
      .required('O campo senha é obrigatório!')
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SigninSchema}
          onSubmit={(values, actions) => {
            props.login(values)
          }}
          render={props => {
            const { values, touched, errors, handleChange, handleBlur } = props;

            return (
              <Form className={classes.form}>
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
                  helperText={(errors.email && touched.email) && errors.email}
                />
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
                  helperText={(errors.password && touched.password) && errors.password}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Manter-me logado"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Entrar
                  </Button>
              </Form>
            )
          }}
        />
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to='/login' underline='none' color="textPrimary">
              Esqueceu a senha?
                </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to='/cadastro' underline='none' color="textPrimary">
              Não tem uma conta? Crie uma
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ login }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)