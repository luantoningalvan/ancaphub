import React, { useState } from 'react';
import TextField from '../ui/TextField';
import Button from '../ui/Button';

export default ({onSubmit}) => {
  const INITIAL_STATE = { name: '', username: '', email: '', password: '', confirmPassword: '' };
  const [data, setData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        placeholder="Nome"
        onChange={handleChange}
        name="name"
        value={data.name}
        autoComplete="full-name"
      />

      <TextField
        type="text"
        placeholder="Usuário"
        onChange={handleChange}
        name="username"
        value={data.username}
        autoComplete="username"
      />

      <TextField
        type="email"
        placeholder="E-mail"
        onChange={handleChange}
        name="email"
        value={data.email}
        autoComplete="email"
      />

      <TextField
        type="password"
        placeholder="Senha"
        onChange={handleChange}
        name="password"
        autoComplete="new-password"
        value={data.password}
      />

      <TextField
        type="password"
        placeholder="Confirmar senha"
        onChange={handleChange}
        name="confirmPassword"
        autoComplete="confirm-password"
        value={data.confirmPassword}
      />

      <Button type="submit" color="secondary">Cadastrar</Button>
    </form>
  );
};
