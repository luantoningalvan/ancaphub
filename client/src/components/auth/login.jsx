import React from 'react';
import {
  TextField,
  Grid,
  Box,
  FormControlLabel,
  Button,
  Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../../actions/authActions';

const useStyles = makeStyles(theme => ({
  tab: {
    width: '100%',
    overflow: "hidden",
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
      {props.serverErrors.alerts !== null &&
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
                  color="secondary"
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
                  color="secondary"
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
                    control={<Checkbox value="remember" color="secondary" />}
                    label="Manter-me logado"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
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
