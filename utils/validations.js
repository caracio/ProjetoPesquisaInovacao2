const yup = require("yup");

class Validations {
  validationRegister() {
    return yup.object().shape({
      Nome: yup.string().required(),
      Email: yup.string().email().matches().required(),
      Senha: yup.string().min(4).required(),
    });
  }
  validationLogin() {
    return yup.object().shape({
      Email: yup.string().email().matches().required(),
      Senha: yup.string().min(4).required(),
    });
  }
}

module.exports = new Validations();
