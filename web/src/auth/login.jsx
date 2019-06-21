import React from 'react'
import { Formik, Form } from 'formik'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import * as Yup from 'yup';
import { signIn } from './authActions'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('O campo e-mail é obrigatório!'),
    password: Yup.string()
      .required('O campo senha é obrigatório!')
  });

  const classes = useStyles();
  
  return (
    <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={SigninSchema}
    onSubmit={(values, actions) => {
      props.signIn(values)
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
  )
}

function mapStateToProps(state) {
  return { login: state.auth }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)