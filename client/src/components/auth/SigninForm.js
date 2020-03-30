import React, { useState } from 'react'
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";

export default props => {
  const INITIAL_STATE = { name: "", username: "", email: "", password: "", confirmPassword: "" }
  const [data, setData] = useState(INITIAL_STATE)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        placeholder="Usuário"
        onChange={handleChange}
        name="username"
        value={data.username}
        autoComplete="username"
      />

      <TextField
        type="password"
        placeholder="Confirmar senha"
        onChange={handleChange}
        name="confirmPassword"
        autoComplete="confirm-password"
        value={data.confirmPassword}
      />

      <Button type="submit" color="secondary">Entrar</Button>
    </form>
  )
}
