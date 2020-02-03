import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
  Link,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined as LockOutlinedIcon} from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../../actions/authActions';
import TitleComponent from '../../components/template/titleComponent';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  errorMessage: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  }
}));

function SignIn(props) {
  const classes = useStyles();

  // Validação frontend do formulário
  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('O campo e-mail é obrigatório!'),
    password: Yup.string().required('O campo senha é obrigatório!')
  });

  return (
    <Container component="main" maxWidth="xs">
      <TitleComponent title="Entrar" />
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
            props.signIn(values);
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
                  helperText={errors.email && touched.email && errors.email}
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
                  helperText={
                    errors.password && touched.password && errors.password
                  }
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
                  className={classes.submit}>
                  Entrar
                </Button>
              </Form>
            );
          }}
        />
        <Grid container>
          <Grid item xs>
            <Link
              component={RouterLink}
              to="/login"
              underline="none"
              color="textPrimary">
              Esqueceu a senha?
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
