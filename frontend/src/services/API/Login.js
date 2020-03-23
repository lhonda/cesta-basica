import { Api } from './index'

const route = '/sign-in'

export async function Auth(data) {
  try {
    return (await Api.post(route, data)).data
  } catch (err) {
    return undefined
  }
}
