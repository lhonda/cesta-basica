import { Api } from './index'
import { types } from '../../store'

const route = '/load'

export async function ChargesList(dispatch) {
  try {
    const charges = (await Api.get(route)).data
    dispatch({ type: types.SET_CHARGE_LIST, payload: charges })
  } catch (err) {
    return 'failed'
  }
}
