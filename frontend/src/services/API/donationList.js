import { Api } from './index'
import { types } from '../../store'
import { compressImageFile } from '../../utils/compressFile'
import { donationRegisterSuccessMessage } from '../../utils/strings'
import { showFailureAlert, showSuccessAlert } from '../../utils/showAlert'

const route = '/donations'
const routeFilter = '/filter/donation'
const routeDonationEnd = (id) => `/donations/${id}/end`

export async function DonationsList(dispatch) {
  try {
    const { donations } = (await Api.get(route)).data
    dispatch({ type: types.SET_DONATION_LIST, payload: donations })
  } catch (err) {
    return 'failed'
  }
}

export async function DonationRegister(dispatch, request) {
  try {
    await Api.post(route, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    showSuccessAlert(dispatch, donationRegisterSuccessMessage)
    return true
  } catch (error) {
    showFailureAlert(dispatch, error.response.data.message)
    return false
  }
}

export async function DonationVoucher(dataScreen, store) {
  const { id, voucher, delivered, CPF, fullName, image, comment, phoneNumber, email } = dataScreen
  const { lat, lon } = store.userLocation

  const compressedFile = image ? await compressImageFile(image) : image

  const formData = new FormData()
  formData.append('voucherId', voucher)
  formData.append('lat', lat)
  formData.append('lon', lon)
  formData.append('delivered', delivered)
  formData.append('receivedCpf', CPF)
  formData.append('receivedName', fullName)
  formData.append('donateDonationFile', compressedFile)
  formData.append('leaderComment', comment)
  formData.append('receivedContactNumber', phoneNumber)
  formData.append('receivedEmail', email)

  try {
    await Api.post(`donations/${id}/donate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return true
  } catch (error) {
    return false
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

export async function DonationDetails(dispatch, id) {
  try {
    const response = (await Api.get(`${route}/${id}/details`, { params: { id } })).data
    dispatch({ type: types.SET_DONATION_DETAILS, payload: response })
  } catch (err) {
    return 'failed'
  }
}

export async function FilteredDonationList(dispatch, filters = {}) {
  const {
    leaderName = '',
    siteId = '',
    status = '',
    listDonationId = '',
    state = '',
    city = '',
    dateTo = '',
    dateFrom = '',
  } = filters
  try {
    const response = (
      await Api.get(routeFilter, {
        params: { leaderName, siteId, status, listDonationId, state, city, dateTo, dateFrom },
      })
    ).data

    dispatch({ type: types.SET_DONATION_LIST, payload: response })
  } catch (err) {
    showFailureAlert(dispatch, err.response.data.message)
  }
}

export async function openUrlDonationById(id) {
  try {
    const { data } = await Api.get(`donation/${id}/url`)
    window.open(data.url, '_blank')
  } catch (err) {
    console.log(err)
  }
}

export async function openUrlVoucherById(id) {
  try {
    const { data } = await Api.get(`voucher/${id}/url`)
    window.open(data.url, '_blank')
  } catch (err) {
    console.log(err)
  }
}
