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

  validationCadastroLoja() {
    return yup.object().shape({
      Nome: yup.string().required("informe seu Nome!"),
      CNPJ: yup.number().min(14).required("informe CNPJ valido!!!"),
      CEP: yup.number().min(8).required(),
      Estado: yup.string().max(2).required("Digite seu UF!"),
      Cidade: yup.string().required("informe sua Cidade"),
      Bairro: yup.string().required("informe seu Bairro!"),
    });
  }
}

module.exports = new Validations();
