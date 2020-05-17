import React, { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Button from '../ui/Button';
import Input from '../form/Input';
import { authUserRequest } from '../../actions/auth';
import GridContainer from '../ui/GridContainer';
import GridItem from '../ui/GridItem';

export default () => {
  const dispatch = useDispatch();
  const signupFormRef = useRef(null);
  const { formatMessage } = useIntl();
  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email(formatMessage({ id: 'account.settings.validation.emailInvalid' }))
          .required(formatMessage({ id: 'account.settings.validation.emailRequired' })),
        password: Yup.string().required({ id: 'account.settings.validation.passwordRequired' }),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(authUserRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        signupFormRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit} ref={signupFormRef}>
      <GridContainer spacing={1}>
        <GridItem xs={12}>
          <FormattedMessage id="common.email">
            {(msg) => (
              <Input
                type="email"
                placeholder={msg}
                name="email"
                autoComplete="email"
              />
            )}
          </FormattedMessage>
        </GridItem>

        <GridItem xs={12}>
          <FormattedMessage id="common.password">
            {(msg) => (
              <Input
                type="password"
                placeholder={msg}
                name="password"
                autoComplete="password"
              />
            )}
          </FormattedMessage>
        </GridItem>
        <GridItem xs={12}>
          <Button type="submit" color="secondary" style={{ width: '100%' }}>
            <FormattedMessage id="common.login" description="Login button" />
          </Button>
        </GridItem>
      </GridContainer>
    </Form>
  );
};
