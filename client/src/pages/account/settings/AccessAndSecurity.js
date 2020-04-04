import React, { useRef } from "react";
import { Form } from "@unform/web";
import * as Yup from "yup";
import TextField from "../../../components/form/Input";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import CardBody from "../../../components/ui/CardBody";
import CardHeader from "../../../components/ui/CardHeader";
import ExpansionPanel from "../../../components/ui/ExpansionPanel";
import { useDispatch, useSelector } from "react-redux";
import { 
  updateEmailRequest, 
  updateUsernameRequest, 
  updatePasswordRequest
} from '../../../actions/settings';

export default (props) => {
  const emailFormRef = useRef(null);
  const usernameFormRef = useRef(null);
  const passwordFormRef = useRef(null);
  const dispatch = useDispatch()
  const currentData = useSelector(state => state.auth.user)

  console.log(currentData)
  const handleUsernameSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        username: Yup.string()
          .min(3, "Nome de usuário muito curto!")
          .max(20, "Nome de usuário muito longo!")
          .matches(/^[a-zA-Z0-9_]+$/, "É permitido apenas letras, números e _ ")
          .required("O campo NOME DE USUÁRIO é obrigatório!"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(updateUsernameRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        usernameFormRef.current.setErrors(validationErrors);
      }
    }
  };

  const handleEmailSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail inválido")
          .required("O campo E-MAIL é obrigatório!"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(updateEmailRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        emailFormRef.current.setErrors(validationErrors);
      }
    }
  };

  const handlePasswordSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        current_password: Yup.string()
          .required("O campo SENHA ATUAL é obrigatório!"),
        new_password: Yup.string()
          .required("O campo SENHA é obrigatório!")
          .min(6, "Sua senha precisa ter no mínimo 6 caracteres."),
        confirm_new_password: Yup.string()
          .required("O campo CONFIRMAR SENHA é obrigatório!")
          .oneOf([Yup.ref("new_password"), null], "As senhas não coincidem"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(updatePasswordRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        passwordFormRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3>Acesso e segurança</h3>
      </CardHeader>
      <CardBody>
        <ExpansionPanel title="Nome de Usuário">
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
            onSubmit={handleUsernameSubmit}
            ref={usernameFormRef}
            initialData={{username: currentData.username}}
          >
            <TextField
              fullWidth
              placeholder="Seu novo nome de usuário"
              name="username"
              type="text"
            />
            <Button type="submit" color="secondary" style={{ marginTop: 16 }}>
              Alterar
            </Button>
          </Form>
        </ExpansionPanel>
        <ExpansionPanel title="E-mail" style={{ marginTop: 8 }}>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
            onSubmit={handleEmailSubmit}
            ref={emailFormRef}
            initialData={{email: currentData.email}}
          >
            <TextField
              fullWidth
              placeholder="Seu novo e-mail"
              name="email"
              type="email"
            />
            <Button type="submit" color="secondary" style={{ marginTop: 16 }}>
              Alterar
            </Button>
          </Form>
        </ExpansionPanel>
        <ExpansionPanel title="Senha" style={{ marginTop: 8 }}>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
            onSubmit={handlePasswordSubmit}
            ref={passwordFormRef}
          >
            <TextField
              placeholder="Nova Senha"
              name="new_password"
              type="password"
            />
            <TextField
              placeholder="Confirmar nova senha"
              name="confirm_new_password"
              type="password"
              style={{ marginTop: 8 }}
            />
            <TextField
              placeholder="Sua senha"
              name="current_password"
              type="password"
              style={{ marginTop: 8 }}
            />
            <Button type="submit" color="secondary" style={{ marginTop: 16 }}>
              Alterar
            </Button>
          </Form>
        </ExpansionPanel>
      </CardBody>
    </Card>
  );
};
