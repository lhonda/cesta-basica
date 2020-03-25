import { Api } from './API'
import { types } from '../store'

const route = '/sign-in'

export async function Auth(dataRequest, dispatch, history) {
  try {
    const response = await Api.post(route, dataRequest)
    const { user, token } = response.data
    dispatch({ type: types.SET_USER, payload: user })
    dispatch({ type: types.SET_TOKEN, payload: { token } })
    // trocar quando tiver roles
    history.push('/donation-list')
  } catch (err) {
    return undefined
  }
}
