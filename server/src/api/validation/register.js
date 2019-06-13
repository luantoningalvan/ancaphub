const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "O campo nome é obrigatório.";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "O campo email é obrigatório.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "O e-mail digitado é inválido.";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "O campo senha é obrigatório.";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "O campo confirmar senha é obrigatório.";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "A senha tem que ter pelo menos 6 caracteres";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "As senha não coincidem.";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};