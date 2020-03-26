import { Api } from './index'

const route = '/commitment'

export async function AcceptTerms(history) {
  try {
    await Api.post(route)
    history.push('/donation-list')
  } catch (error) {
    return undefined
  }
}
