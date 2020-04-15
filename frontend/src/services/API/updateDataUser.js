import { Api } from './index'

async function updateUser(payload) {
  try {
    return await Api.patch('/user', payload)
  } catch ({ response }) {
    return response
  }
}

export const updateEmail = (email) => updateUser({ email })
export const updatePassword = (password, confirmPassword) => updateUser({ password, confirmPassword })
