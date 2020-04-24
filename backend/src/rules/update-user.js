import { User } from '../repositories/user'
import { encrypt } from '../services/encrypt'
import Joi from 'joi'

export async function updateUser (params) {
  let { login, email, password, confirmPassword } = params

  if (!email && !password) {
    throw new Error('As variáveis email ou password precisam ser preenchidas')
  }

  const userFDB = await User.findOne({ login })

  if (!userFDB) {
    throw new Error(`Usuário com o login ${login} não foi encontrado`)
  }

  if (email) {
    const emailSchema = Joi.object({
      email: Joi.string().lowercase().email({ minDomainAtoms: 2 })
    })
    const result = Joi.validate({ email }, emailSchema)
    if (result.error) {
      throw new Error('A variável email foi preenchida de forma inválida')
    }

    const newEmail = { $set: { email: email } }

    userFDB.updateOne(newEmail, (err, res) => {
      if (err) throw err
    })

    return {
      message: 'Email alterado com sucesso'
    }
  }

  if (password) {
    if (!confirmPassword) {
      throw new Error('A variável confirmPassword precisa ser preenchida')
    }

    if (password !== confirmPassword) {
      throw new Error('As variáveis password e confirmPassword não correspondem entre si')
    }

    password = encrypt(password)

    const newPassword = { $set: { password } }

    userFDB.updateOne(newPassword, (err, res) => {
      if (err) throw err
    })

    return {
      message: 'Senha alterada com sucesso'
    }
  }
}
