import React, { useRef } from "react";
import Input from "../form/Input";
import { Form } from "@unform/web";
import Button from "../ui/Button";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { authUserRequest } from "../../actions/auth";
import GridContainer from "../ui/GridContainer";
import GridItem from "../ui/GridItem";

export default () => {
  const dispatch = useDispatch();
  const signupFormRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail inválido")
          .required("O campo e-mail é obrigatório!"),
        password: Yup.string().required("O campo senha é obrigatório!"),
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
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            autoComplete="email"
          />
        </GridItem>

        <GridItem xs={12}>
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            autoComplete="password"
          />
        </GridItem>
        <GridItem xs={12}>
          <Button type="submit" color="secondary" style={{ width: "100%" }}>
            Entrar
          </Button>
        </GridItem>
      </GridContainer>
    </Form>
  );
};
