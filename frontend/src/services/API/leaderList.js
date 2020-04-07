import { Api } from './index'
import { types } from '../../store'

const route = '/leaders'
// const routeDonationEnd = (id) => `/donations/${id}/end`

export async function LeadersList(dispatch, inputParams) {
  try {
    const leaders = (await Api.get(`${route}/${inputParams}`)).data
    dispatch({ type: types.SET_LEADER_LIST, payload: leaders })
  } catch (err) {
    return 'failed'
  }
}

// export async function DonationVoucher(dataScreen, store) {
//   const { id, voucher, delivered, CPF, fullName, image } = dataScreen
//   const { lat, lon } = store.userLocation
//   const formData = new FormData()
//   formData.append('voucherId', voucher)
//   formData.append('lat', lat)
//   formData.append('lon', lon)
//   formData.append('delivered', delivered)
//   formData.append('receivedCpf', CPF)
//   formData.append('receivedName', fullName)
//   formData.append('donateDonationFile', image)
//   try {
//     await Api.post(`donations/${id}/donate`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     return true
//   } catch (error) {
//     return false
//   }
// }

// export async function EndDonation(id, nextPage) {
//   try {
//     await Api.post(routeDonationEnd(id))
//     nextPage()
//   } catch (err) {
//     return 'failed'
//   }
// }
