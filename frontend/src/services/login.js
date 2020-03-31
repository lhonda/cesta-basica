import { Api } from './API'
import { types } from '../store'
import { nextRouteToRole } from '../routes/routeWrapper'

const route = '/sign-in'

export async function Auth(dataRequest, dispatch, history) {
  try {
    const response = await Api.post(route, dataRequest)
    const { user, token } = response.data
    dispatch({ type: types.SET_USER, payload: user })
    dispatch({ type: types.SET_TOKEN, payload: { token } })
    const nextRoute = nextRouteToRole[user.role]
    history.push(nextRoute || '/')
  } catch (err) {
    return undefined
  }
}
