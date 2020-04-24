import { User } from '../repositories'

export async function listLeaders (name = '') {
  if (!name) {
    throw new Error('A variável name deve ser preenchida')
  }

  if (name.toString().length < 3) {
    throw new Error('A variavel name deve conter pelo menos três caracteres')
  }

  return (await User.find({
    role: 'leader',
    name: new RegExp(`^${name}`, 'i')
  })).map(({ name, login }) => ({ name, login }))
}
