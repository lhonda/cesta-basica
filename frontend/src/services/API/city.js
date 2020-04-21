import { Api } from './index'
import { types } from '../../store/types'

const route = 'cities'

export async function getCities(dispatch, uf) {
  try {
    const cities = (await Api.get(`/${route}/${uf}`)).data
    dispatch({ type: types.SET_CITIES, payload: cities })
  } catch (err) {
    console.log('err: ', err)
  }
}
