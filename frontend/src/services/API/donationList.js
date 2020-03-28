import { Api } from './index'
import { types } from '../../store'

const route = '/donations'
const routeDonationEnd = (id) => `/donations/${id}/end`

export async function DonationsList(dispatch) {
  try {
    const { donations } = (await Api.get(route)).data
    dispatch({ type: types.SET_DONATION_LIST, payload: donations })
  } catch (err) {
    return 'failed'
  }
}

export async function EndDonation(id, nextPage) {
  try {
    await Api.post(routeDonationEnd(id))
    nextPage()
  } catch (err) {
    return 'failed'
  }
}
