const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "O campo e-mail é obrigatório.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "O e-mail é inválido.";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "O campo senha é obrigatório.";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};