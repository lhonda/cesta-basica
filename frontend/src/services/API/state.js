import { Api } from './index'
import { types } from '../../store/types'

const route = 'states'

export async function getStates(dispatch) {
  try {
    const states = (await Api.get(route)).data
    dispatch({ type: types.SET_STATES, payload: states })
  } catch (err) {
    console.log('err: ', err)
  }
}
