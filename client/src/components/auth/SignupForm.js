import React, { useState } from 'react'
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";

export default props => {
  const INITIAL_STATE = { username: "", password: "" }
  const [data, setData] = useState(INITIAL_STATE)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleSubmit(data)
  }

  return (
    <form onSubmit={props.onSubmit}>
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
  )
}