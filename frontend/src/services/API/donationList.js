import { Api } from './index'
import { types } from '../../store'

const route = '/donations'

export async function DonationsList(dispatch) {
  try {
    const { donations } = (await Api.get(route)).data
    dispatch({ type: types.SET_DONATION_LIST, payload: donations })
  } catch (err) {
    return 'failed'
  }
}
