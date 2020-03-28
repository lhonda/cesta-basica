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

export async function DonationVoucher(dataScreen, store, goToNextRoute) {
  goToNextRoute()
  
  const { id, voucher, delivered, CPF, fullName, image } = dataScreen
  const { lat, lon } = store.userLocation
  const formData = new FormData()
  formData.append('voucherId', voucher)
  formData.append('lat', lat)
  formData.append('lon', lon)
  formData.append('delivered', delivered)
  formData.append('receivedCpf', CPF)
  formData.append('receivedName', fullName)
  formData.append('donateDonationFile', image)
  try {
    await Api.post(`donations/${id}/donate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    goToNextRoute()
  } catch (error) {
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
