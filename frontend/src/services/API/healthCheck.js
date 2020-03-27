import { Api } from './index'

const route = '/checklist'

export async function healthCheck() {
  try {
    await Api.post(route)
    return true
  } catch (error) {
    return false
  }
}
