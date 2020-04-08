
const Joi = require('joi').extend(require('joi-cpf-cnpj'))

export async function validateLogin (cpf) {
  const loginSchema = Joi.document().cpf()
  const login = Joi.validate(cpf, loginSchema)

  if (login.error) return false

  return true
}
