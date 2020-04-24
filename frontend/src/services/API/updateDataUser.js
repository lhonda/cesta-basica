import { Api } from './index'

const route = '/users'

async function updateUser(payload) {
  try {
    return await Api.patch(route, payload)
  } catch ({ response }) {
    return response
  }
}

export const updateEmail = (email) => updateUser({ email })
export const updatePassword = (password, confirmPassword) => updateUser({ password, confirmPassword })
