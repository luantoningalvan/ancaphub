import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { signIn } from './authActions';
import { connect } from 'react-redux';

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

function SignInForm(props) {
  const classes = useStyles();
  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('O campo e-mail é obrigatório!'),
    password: Yup.string().required('O campo senha é obrigatório!')
  });
  console.log(props);
  return (
    <React.Fragment>
      {props.serverErrors.alerts != null &&
        props.serverErrors.alerts.msg.map((msg, index) => (
          <Box mb={1} key={index}>
            <p className={classes.errorMessage}>{msg.msg}</p>
          </Box>
        ))}

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SigninSchema}
        onSubmit={(values, actions) => {
          props.signIn(values);
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
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    id="login-email"
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
                    id="login-password"
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
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Manter-me logado"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}>
                    Entrar
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

const mapStateToProps = state => ({
  login: state.auth,
  serverErrors: state.alerts
});
const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
