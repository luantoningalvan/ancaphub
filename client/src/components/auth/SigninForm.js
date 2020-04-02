import React, { useState } from 'react';
import TextField from '../ui/TextField';
import Button from '../ui/Button';

export default ({onSubmit}) => {
  const INITIAL_STATE = {
    email: '', password: '',
  };
  const [data, setData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    console.log(data)
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
        autoComplete="password"
        value={data.password}
      />

      <Button type="submit" color="secondary">Entrar</Button>
    </form>
  );
};
