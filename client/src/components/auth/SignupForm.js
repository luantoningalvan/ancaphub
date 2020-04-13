import React, { useRef } from "react";
import Input from "../form/Input";
import { Form } from "@unform/web";
import Button from "../ui/Button";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createUserRequest } from "../../actions/users";
import GridContainer from "../ui/GridContainer";
import GridItem from "../ui/GridItem";

export default () => {
  const dispatch = useDispatch();
  const signupFormRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(3, "Nome muito curto!")
          .max(30, "Nome muito longo!")
          .required("O campo NOME é obrigatório!"),
        username: Yup.string()
          .min(3, "Nome de usuário muito curto!")
          .max(20, "Nome de usuário muito longo!")
          .matches(/^[a-zA-Z0-9_]+$/, "É permitido apenas letras, números e _ ")
          .required("O campo NOME DE USUÁRIO é obrigatório!"),
        email: Yup.string()
          .email("E-mail inválido")
          .required("O campo E-MAIL é obrigatório!"),
        password: Yup.string()
          .required("O campo SENHA é obrigatório!")
          .min(6, "Sua senha precisa ter no mínimo 6 caracteres."),
        confirmPassword: Yup.string()
          .required("O campo CONFIRMAR SENHA é obrigatório!")
          .oneOf([Yup.ref("password"), null], "As senhas não coincidem"),
        code: Yup.string()
          .required("O campo CONVITE é obrigatório!")
          .length(20, "Um convite válido possui 20 caracteres."),  
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(createUserRequest(data))
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
            type="text"
            placeholder="Nome"
            name="name"
            autoComplete="full-name"
          />
        </GridItem>

        <GridItem xs={12}>
          <Input
            type="text"
            placeholder="Usuário"
            name="username"
            autoComplete="username"
          />
        </GridItem>

        <GridItem xs={12}>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            autoComplete="email"
          />
        </GridItem>

        <GridItem xs={6}>
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            autoComplete="new-password"
          />
        </GridItem>

        <GridItem xs={6}>
          <Input
            type="password"
            placeholder="Confirmar senha"
            name="confirmPassword"
            autoComplete="confirm-password"
          />
        </GridItem>

        <GridItem xs={12}>
          <Input type="text" placeholder="Convite" name="code" />
        </GridItem>
        <GridItem xs={12}>
          <Button type="submit" color="secondary" style={{width: "100%"}}>
            Cadastrar
          </Button>
        </GridItem>
      </GridContainer>
    </Form>
  );
};
