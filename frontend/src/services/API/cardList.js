import { Api } from './index'
import { types } from '../../store'

const route = '/vouchers'

export async function CardList(dispatch, donationId) {
  try {
    const cards = (await Api.get(route, { params: { donationId } })).data
    dispatch({ type: types.SET_CARD_LIST, payload: cards })
  } catch (err) {
    return 'failed'
  }
}
