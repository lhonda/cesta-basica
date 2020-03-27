import { Api } from './index'

const route = '/commitment'
const commitmentCheckRoute = `${route}/check`

export async function AcceptTerms(history) {
  try {
    await Api.post(route)
    history.push('/donation-list')
  } catch (error) {
    return undefined
  }
}

export async function CommitmentCheck(history) {
  try {
    const { commitment } = (await Api.get(commitmentCheckRoute)).data
    if (!commitment) {
      history.push('/terms')
    }
  } catch (error) {
    return undefined
  }
}
