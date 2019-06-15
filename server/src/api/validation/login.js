const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Converte os campos vazios em strings vazias para assim poder usar as funções de validação
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Verifica o email
  if (Validator.isEmpty(data.email)) {
    errors.email = "O campo e-mail é obrigatório.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "O e-mail é inválido.";
  }

  // Verifica a senha
  if (Validator.isEmpty(data.password)) {
    errors.password = "O campo senha é obrigatório.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};